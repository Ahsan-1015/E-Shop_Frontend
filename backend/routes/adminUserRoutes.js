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

router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getUserById);
router.delete("/:id", protect, admin, deleteUser);
router.put("/:id/block", protect, admin, toggleUserBlock);

module.exports = router;