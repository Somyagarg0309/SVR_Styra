const express = require("express");
require('dotenv').config();

const fashionBotRoutes = require("./routes/fashionBotRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json({ limit: "10mb" }));

app.use("/fashionbot", fashionBotRoutes);
app.use("/searchproduct", productRoutes);

module.exports = app;
