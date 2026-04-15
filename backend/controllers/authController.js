const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL || "",
        role: user.role || "user",
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

res.json({
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL || "",
      role: user.role || "user",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL || "",
      role: user.role || "user",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, photoURL } = req.body;

    const existingUser = await User.findById(req.user.id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists && emailExists._id.toString() !== req.user.id) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (photoURL !== undefined) updateData.photoURL = photoURL;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      _id: updatedUser._id,
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photoURL: updatedUser.photoURL || "",
      role: updatedUser.role || "user",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Social login (Google, GitHub)
// @route   POST /api/auth/social-login
// @access  Public
const socialLogin = async (req, res) => {
  try {
    const { name, email, provider, providerId, photoURL } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!provider) {
      return res.status(400).json({ message: "Provider is required" });
    }

    // Ensure name is never undefined
    const userName = name || email.split("@")[0] || "User";

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists, update provider info if needed
      if (user.provider !== provider) {
        user.provider = provider;
        user.providerId = providerId;
      }
      // Update photoURL if provided and user doesn't have one
      if (photoURL && !user.photoURL) {
        user.photoURL = photoURL;
      }
      await user.save();
    } else {
      // Create new user for social login
      user = await User.create({
        name: userName,
        email,
        provider,
        providerId,
        photoURL: photoURL || "",
        password: undefined,
      });
    }

    res.json({
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL || "",
      role: user.role || "user",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  socialLogin,
};
