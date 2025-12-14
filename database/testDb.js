import dotenv from "dotenv";
import { connectToDb } from "./mongoose.ts";

dotenv.config({ path: ".env.local" });

async function testConnection() {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    console.log(`📍 URI: ${process.env.MONGODB_URI?.slice(0, 50)}...`);

    await connectToDb();

    console.log("✅ Database connection successful!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error("Error:", error.message);
    process.exit(1);
  }
}

testConnection();
