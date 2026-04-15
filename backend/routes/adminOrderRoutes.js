const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
} = require("../controllers/adminOrderController");

router.get("/", protect, admin, getAllOrders);
router.get("/:id", protect, admin, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;