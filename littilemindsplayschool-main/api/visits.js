import mongoose from "mongoose";

// Cache the MongoDB connection across serverless invocations
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB Connected (serverless)");
}

// Define schema & model (with caching to avoid re-compilation errors)
const visitSchema = new mongoose.Schema({
  name: String,
  phone: String,
  childAge: String,
  date: String,
  time: String,
}, { timestamps: true });

const Visit = mongoose.models.Visit || mongoose.model("Visit", visitSchema);

export default async function handler(req, res) {
  // Allow CORS for local development
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();

    if (req.method === "POST") {
      console.log("📥 Incoming Visit Data:", req.body);
      const visit = await Visit.create(req.body);
      console.log("✅ Saved:", visit);
      return res.status(201).json({
        message: "Visit scheduled successfully",
        data: visit,
      });
    }

    if (req.method === "GET") {
      const visits = await Visit.find().sort({ createdAt: -1 });
      return res.json(visits);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
