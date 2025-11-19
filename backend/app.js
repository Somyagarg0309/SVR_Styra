const express = require("express");
require('dotenv').config();
const cors = require("cors"); // ✅ import cors
const session = require("express-session");
const passport = require("passport");
require("./auth/auth.js");  
const fashionBotRoutes = require("./routes/fashionBotRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(session({ // goole login begins
    secret: "mysecret",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Add your new auth route
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);// google login ends



// Enable CORS for all origins
app.use(cors());

// Parse JSON requests
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/fashionbot", fashionBotRoutes);
app.use("/searchproduct", productRoutes);

module.exports = app;
