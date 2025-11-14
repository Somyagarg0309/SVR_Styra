const express = require("express");
require('dotenv').config();
const cors = require("cors"); // ✅ import cors

const fashionBotRoutes = require("./routes/fashionBotRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON requests
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/fashionbot", fashionBotRoutes);
app.use("/searchproduct", productRoutes);

module.exports = app;
