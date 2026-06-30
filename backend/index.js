import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/bookings", bookingRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Travel TBI-GEHU Backend Running 🚀",
  });
});

// Protected Route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You are inside protected route 🔒",
    user: req.user,
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    uptime: process.uptime(),
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});