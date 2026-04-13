const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const User = require("../models/User");

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ items: user.cart || [] });
  } catch (error) {
    console.error("GET /api/cart error:", error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart
// @desc    Update user's cart
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { items } = req.body;
    
    // First get user
    let user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Initialize cart array if undefined
    if (!user.cart) {
      user.cart = [];
    }
    
    // Update cart
    user.cart = items || [];
    await user.save();
    
    res.json({ items: user.cart || [] });
  } catch (error) {
    console.error("POST /api/cart error:", error);
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cart
// @desc    Clear user's cart
// @access  Private
router.delete("/", protect, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.cart = [];
    await user.save();
    
    res.json({ items: [] });
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
