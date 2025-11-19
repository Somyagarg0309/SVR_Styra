const express = require("express");
const passport = require("passport");
const router = express.Router();
require('dotenv').config();

// User clicks login → redirect to Google
router.get("/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google redirects back here ↓
router.get("/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect(process.env.back + "?user=" + encodeURIComponent(JSON.stringify(req.user)));
  }
);

module.exports = router;