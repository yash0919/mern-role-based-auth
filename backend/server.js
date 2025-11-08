// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // You can later restrict this to your Netlify domain
    methods: ["GET", "POST"],
  })
);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// PORT setup
const PORT = process.env.PORT || 5000;

// Start Server with Port Auto-Fix
const startServer = (port) => {
  const server = app
    .listen(port, () => {
      console.log(`🚀 Server running on port ${server.address().port}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`⚠️ Port ${port} is in use. Trying another port...`);
        setTimeout(() => {
          server.close();
          startServer(port + 1); // Automatically try next port
        }, 1000);
      } else {
        console.error("❌ Server error:", err);
      }
    });
};

startServer(Number(PORT));
