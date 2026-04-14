const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/adminProductController");

router.get("/products", protect, admin, getAdminProducts);
router.post("/products", protect, admin, createProduct);
router.put("/products/:id", protect, admin, updateProduct);
router.delete("/products/:id", protect, admin, deleteProduct);

module.exports = router;