const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.get("/searchproduct", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

  try {
    // Step 1: Call Google Shopping API
    const shoppingRes = await axios.get("https://www.searchapi.io/api/v1/search", {
      params: {
        engine: "google_shopping",
        api_key: process.env.GOOGLE_API_KEY,
        q,
        gl: "in",        // India locale
        hl: "en",
        location: "India"
      }
    });

    // Get first 5 products only
    const shoppingResults = (shoppingRes.data.shopping_results || []).slice(0, 5);
    const productDetailsArray = [];

    // Step 2 & 3: Fetch details for only those top 5 products
    for (const item of shoppingResults) {
      const productId = item.product_id || null;
      const productToken = item.product_token || null;

      if (productId || productToken) {
        const detailRes = await axios.get("https://www.searchapi.io/api/v1/search", {
          params: {
            engine: "google_product",
            api_key: process.env.GOOGLE_API_KEY,
            product_id: productId,
            product_token: productToken,
            location: "India"
          }
        });

        const product = detailRes.data.product;
        const offers = detailRes.data.offers || [];
        const firstOffer = offers[0] || {};

        if (product) {
          productDetailsArray.push({
            title: product.title || null,
            brand: product.brand || null,
            description: product.description || null,
            images: product.images || [],
            price: firstOffer.price || null,
            rating: firstOffer.rating || null,
            offers_link: firstOffer.link || null
          });
        }
      }
    }

    res.json({ query: q, products: productDetailsArray });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching products", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
