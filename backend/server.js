// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

/* ---------------- SECURITY ---------------- */
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting
app.use("/api", apiLimiter);

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// CORS (SAFE for production)
app.use(
  cors({
    origin: "*", // frontend handled separately
    credentials: false
  })
);

/* ---------------- DATABASE ---------------- */
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

/* ---------------- ROUTES ---------------- */
const authRoutes = require("./routes/auth");
const geneticsRoutes = require("./routes/genetics");
const familyTreeRoutes = require("./routes/familyTree");

app.use("/api/auth", authRoutes);
app.use("/api/genetics", geneticsRoutes);
app.use("/api/family-tree", familyTreeRoutes);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.stack);
  res.status(500).json({ message: "Server error" });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
