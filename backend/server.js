// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Enhanced security middlewares
// Set security headers
app.use(helmet());

// Rate limiting to prevent brute force attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting to all API routes
app.use("/api", apiLimiter);

// Body parsing middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// CORS configuration
// For development, allow all origins temporarily
app.use(cors({
  origin: '*',
  credentials: true
}));

// Build a safe Mongo URI (ensure a database name exists)
let rawMongoUri = process.env.MONGO_URI || '';
if (rawMongoUri && rawMongoUri.includes('mongodb') && !/mongodb.*\/(.+?)\?/.test(rawMongoUri)) {
  // Inject default database name 'genesis' before query params or at end
  rawMongoUri = rawMongoUri.replace(/(mongodb[^?]+\/)$/, '$1genesis');
  rawMongoUri = rawMongoUri.replace(/(mongodb[^?]+\/)\?/, '$1genesis?');
}

const mongoUri = rawMongoUri;

let mongoConnected = false;
mongoose
  .connect(mongoUri)
  .then(() => { mongoConnected = true; console.log('✅ MongoDB Connected'); })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('   HINT: Ensure your Atlas IP whitelist includes this machine OR run a local MongoDB instance.');
  });

// Import route modules
const authRoutes = require("./routes/auth");
const geneticsRoutes = require("./routes/genetics");
const familyTreeRoutes = require("./routes/familyTree");

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/genetics", geneticsRoutes);
app.use("/api/family-tree", familyTreeRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "ok",
    message: "Server is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.message);
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Default to 500 server error
  res.status(500).json({ message: "Server error" });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../frontend/dist"));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
