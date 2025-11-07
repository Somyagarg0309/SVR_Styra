const express = require("express");
const { fashionBotHandler } = require("../controllers/fashionBotController");

const router = express.Router();
router.post("/", fashionBotHandler);

module.exports = router;
