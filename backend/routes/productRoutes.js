const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/search/:query", searchProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);

module.exports = router;
