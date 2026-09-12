import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB(): Promise<void> {
  if (!env.mongoUri) {
    console.error("MONGODB_URI is not set. Please configure your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(env.mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}
