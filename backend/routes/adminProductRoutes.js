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

router.get("/", protect, admin, getAdminProducts);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;