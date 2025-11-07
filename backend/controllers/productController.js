const axios = require("axios");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function searchProductHandler(req, res) {
  const { q } = req.query;
  if (!q)
    return res.status(400).json({ error: "Query parameter 'q' is required" });

  try {
    const searchRes = await axios.get("https://www.searchapi.io/api/v1/search", {
      params: {
        engine: "google_shopping",
        api_key: GOOGLE_API_KEY,
        q,
        gl: "in",
        hl: "en",
        location: "India",
      },
    });

    const shoppingResults = (searchRes.data.shopping_results || []).slice(0, 5);
    const products = [];

    for (let i = 0; i < shoppingResults.length; i++) {
      const item = shoppingResults[i];
      const { product_id, product_token } = item;

      if (product_id || product_token) {
        const detailRes = await axios.get(
          "https://www.searchapi.io/api/v1/search",
          {
            params: {
              engine: "google_product",
              api_key: GOOGLE_API_KEY,
              product_id,
              product_token,
              location: "India",
            },
          }
        );

        const product = detailRes.data.product;
        const offer = (detailRes.data.offers || [])[0] || {};

        if (product) {
          const numericPrice = offer.price
            ? Number(offer.price.replace(/[₹,]/g, "").trim())
            : null;

          const description =
            product.description ||
            `Elegant ${product.brand || ""} ${q.replace(/"/g, "")}. Perfect for all occasions.`;

          // Extract and clean category name
          let rawCategory =
            product.category ||
            product.type ||
            q.replace(/"/g, "").toLowerCase();

          // Take the last segment after '/' if present
          let categoryName = rawCategory.split("/").pop().trim();

          // Capitalize first letter
          categoryName =
            categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

          products.push({
            id: i + 1,
            title: product.title || null,
            price: numericPrice,
            description,
            images: product.images || [],
            category: {
              id: i + 1,
              name: categoryName,
              image: product.images?.[0] || null,
            },
            rating: offer.rating || null,
            link: offer.link || null,
          });
        }
      }
    }

    res.json({
      query: q.replace(/"/g, ""),
      products,
    });
  } catch (error) {
    console.error("Error in searchProductHandler:", error.message);
    res.status(500).json({ error: "Error fetching products" });
  }
}

module.exports = { searchProductHandler };
