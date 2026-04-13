const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  socialLogin,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/social-login", socialLogin);
router.get("/profile", protect, getUserProfile);

// @route   DELETE /api/auth/logout
// @desc    Logout user (keep cart and wishlist data)
// @access  Private
router.delete("/logout", protect, async (req, res) => {
  try {
    // Just return success - don't clear cart/wishlist
    // Data should persist for next login
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
