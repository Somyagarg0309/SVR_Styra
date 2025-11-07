const express = require("express");
const { searchProductHandler } = require("../controllers/productController");

const router = express.Router();
router.get("/", searchProductHandler);

module.exports = router;
