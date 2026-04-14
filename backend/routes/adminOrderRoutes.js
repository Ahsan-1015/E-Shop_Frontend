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

router.get("/orders", protect, admin, getAllOrders);
router.get("/orders/:id", protect, admin, getOrderById);
router.put("/orders/:id/status", protect, admin, updateOrderStatus);
router.delete("/orders/:id", protect, admin, deleteOrder);

module.exports = router;