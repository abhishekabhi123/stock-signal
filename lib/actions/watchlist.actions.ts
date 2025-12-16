"use server";

import { connectToDb } from "@/database/mongoose";
import { Watchlist } from "@/models/watchlist.model";

export const getWatchlistSymbolsByEmail = async (
  email: string
): Promise<string[]> => {
  try {
    await connectToDb();

    // Get the user from the Better Auth user collection by email
    const mongoose = await import("mongoose");
    const db = mongoose.connection.db;

    if (!db) {
      console.error("Database connection failed");
      return [];
    }

    const user = await db.collection("user").findOne({ email });

    if (!user || !user.id) {
      console.log(`User not found for email: ${email}`);
      return [];
    }

    // Query watchlist by userId and return symbols only
    const watchlistItems = await Watchlist.find({ userId: user.id }).select(
      "symbol"
    );

    return watchlistItems.map((item) => item.symbol);
  } catch (error) {
    console.error("Error fetching watchlist symbols:", error);
    return [];
  }
};
