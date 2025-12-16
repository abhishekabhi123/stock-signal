"use server";

import { connectToDb } from "@/database/mongoose";

export const getAllUsersForEmail = async () => {
  try {
    const mongoose = await connectToDb();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Db connection failed");

    const users = await db
      .collection("user")
      .find(
        { email: { $exists: true, $ne: null } },
        { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 } }
      )
      .toArray();
    return users
      .filter((user) => user.email && user.name)
      .map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      }));
  } catch (e) {
    console.log(e, "Error finding users");
    return [];
  }
};
