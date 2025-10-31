const axios = require("axios");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function searchProductHandler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

  try {
    const searchRes = await axios.get("https://www.searchapi.io/api/v1/search", {
      params: { engine: "google_shopping", api_key: GOOGLE_API_KEY, q, gl: "in", hl: "en", location: "India" }
    });

    const shoppingResults = (searchRes.data.shopping_results || []).slice(0, 5);
    const products = [];

    for (const item of shoppingResults) {
      const { product_id, product_token } = item;

      if (product_id || product_token) {
        const detailRes = await axios.get("https://www.searchapi.io/api/v1/search", {
          params: { engine: "google_product", api_key: GOOGLE_API_KEY, product_id, product_token, location: "India" }
        });

        const product = detailRes.data.product;
        const offer = (detailRes.data.offers || [])[0] || {};

        if (product) {
          products.push({
            title: product.title || null,
            brand: product.brand || null,
            description: product.description || null,
            images: product.images || [],
            price: offer.price || null,
            rating: offer.rating || null,
            offers_link: offer.link || null
          });
        }
      }
    }

    res.json({ query: q, products });
  } catch (error) {
    console.error("Error in searchProductHandler:", error.message);
    res.status(500).json({ error: "Error fetching products" });
  }
}

module.exports = { searchProductHandler };
