import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// ==========================
// Connect MongoDB
// ==========================
connectDB();

// ==========================
// Middleware
// ==========================
const allowedOrigin =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

// ==========================
// Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ==========================
// Health Check Route
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 TaskFlow Backend is Running!",
  });
});

// ==========================
// 404 Handler
// ==========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 TaskFlow Backend Started");
  console.log(`🌍 Server : http://localhost:${PORT}`);
  console.log("=================================");
});