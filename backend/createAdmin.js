import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const hash = await bcrypt.hash("admin123", 10);
    const user = await User.create({
      username: "admin",
      passwordHash: hash,
      role: "admin"
    });
    console.log("✅ Admin created:", user);
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

createAdmin();
