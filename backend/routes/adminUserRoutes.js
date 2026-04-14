const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const {
  getAllUsers,
  deleteUser,
  toggleUserBlock,
  getUserById,
} = require("../controllers/adminUserController");

router.get("/users", protect, admin, getAllUsers);
router.get("/users/:id", protect, admin, getUserById);
router.delete("/users/:id", protect, admin, deleteUser);
router.put("/users/:id/block", protect, admin, toggleUserBlock);

module.exports = router;