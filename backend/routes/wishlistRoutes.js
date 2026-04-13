const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const User = require("../models/User");

// @route   GET /api/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ items: user.wishlist || [] });
  } catch (error) {
    console.error("GET /api/wishlist error:", error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/wishlist
// @desc    Update user's wishlist
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { items } = req.body;
    
    // First get user
    let user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Initialize wishlist array if undefined
    if (!user.wishlist) {
      user.wishlist = [];
    }
    
    // Update wishlist
    user.wishlist = items || [];
    await user.save();
    
    res.json({ items: user.wishlist || [] });
  } catch (error) {
    console.error("POST /api/wishlist error:", error);
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/wishlist
// @desc    Clear user's wishlist
// @access  Private
router.delete("/", protect, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.wishlist = [];
    await user.save();
    
    res.json({ items: [] });
  } catch (error) {
    console.error("DELETE /api/wishlist error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
