import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;


if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Define a global type-safe cached connection
interface MongooseGlobalCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use globalThis for safe access across reloads in dev
const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose: MongooseGlobalCache;
};

// Initialize cache if not already set
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  const cached = globalWithMongoose.mongoose;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "your-db-name", // ✅ replace with your actual DB name
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
