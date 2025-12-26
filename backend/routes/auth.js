// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check } = require("express-validator");
const User = require("../models/user"); // Fixed case sensitivity issue
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post(
  "/signup",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 8 characters").isLength({ min: 8 }),
    check("name", "Name is required").not().isEmpty()
  ],
  validate,
  async (req, res) => {
    try {
      const { email, password, name, profile } = req.body;

      if (!process.env.JWT_SECRET) {
        console.error('CONFIG ERROR: JWT_SECRET missing');
        return res.status(500).json({ msg: 'Server misconfiguration (JWT secret missing)' });
      }

      if (!email || !password) {
        return res.status(400).json({ msg: 'Email and password required' });
      }

      // Check if user exists
      let existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Create new user
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const newUser = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        profile: profile || {}
      });
      
      await newUser.save();

      // Create and return JWT token
      const payload = {
        id: newUser._id
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.status(201).json({
        msg: "Signup successful",
        token,
        user: newUser
      });
    } catch (err) {
      console.error('Signup error stack:', err);
      res.status(500).json({ msg: 'Server error', detail: err.message });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check for user
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // Update last login time
      user.lastLogin = new Date();
      await user.save();

      // Create and return JWT
      const payload = {
        id: user._id
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({
        token,
        user
      });
    } catch (err) {
      console.error("Login error:", err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    // req.user comes from auth middleware
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    res.json(user);
  } catch (err) {
    console.error("Get user error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
  "/profile",
  [
    auth,
    check("name", "Name cannot be empty").optional().not().isEmpty(),
    check("profile.firstName", "First name cannot be empty").optional().not().isEmpty(),
    check("profile.lastName", "Last name cannot be empty").optional().not().isEmpty(),
    check("profile.dateOfBirth", "Invalid date format").optional().isDate(),
    check("profile.gender", "Gender must be one of: male, female, other, prefer not to say")
      .optional()
      .isIn(["male", "female", "other", "prefer not to say"]),
    check("consentToDataUse", "Consent must be a boolean").optional().isBoolean()
  ],
  validate,
  async (req, res) => {
    try {
      const { name, profile, consentToDataUse } = req.body;
      
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Update fields if provided
      if (name !== undefined) user.name = name;
      if (consentToDataUse !== undefined) user.consentToDataUse = consentToDataUse;
      
      // Update profile fields
      if (profile) {
        user.profile = { ...user.profile, ...profile };
      }

      await user.save();
      res.json(user);
    } catch (err) {
      console.error("Profile update error:", err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   POST /api/auth/change-password
// @desc    Change user password
// @access  Private
router.post(
  "/change-password",
  [
    auth,
    check("currentPassword", "Current password is required").not().isEmpty(),
    check("newPassword", "New password must be at least 8 characters").isLength({ min: 8 })
  ],
  validate,
  async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      // Get user
      const user = await User.findById(req.user._id);
      
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Current password is incorrect" });
      }
      
      // Hash new password and update
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(newPassword, salt);
      
      await user.save();
      res.json({ msg: "Password updated successfully" });
    } catch (err) {
      console.error("Password change error:", err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
