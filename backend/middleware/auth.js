const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    // Preferred header (new front-end uses Authorization: Bearer <token>)
    let token;
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else {
      // Backward compatibility: x-auth-token
      token = req.header('x-auth-token');
    }

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('CONFIG ERROR: JWT_SECRET missing in auth middleware');
      return res.status(500).json({ msg: 'Server misconfiguration' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (verifyErr) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // Update last login (non-blocking)
    user.lastLogin = new Date();
    user.save().catch(e => console.warn('Failed to update lastLogin:', e.message));

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware unexpected error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = auth;