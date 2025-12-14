import dotenv from "dotenv";

// Load env vars BEFORE importing mongoose
dotenv.config({ path: ".env.local" });

import { connectToDb } from "./mongoose";

async function testConnection() {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    console.log(`📍 URI: ${process.env.MONGODB_URI?.slice(0, 50)}...`);

    await connectToDb();

    console.log("✅ Database connection successful!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error("Error:", error);
    process.exit(1);
  }
}

testConnection();
