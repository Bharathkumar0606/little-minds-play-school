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
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

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
      console.log("📥 Incoming Contact Data:", req.body);
      const contact = await Contact.create(req.body);
      console.log("✅ Saved:", contact);
      return res.status(201).json({
        message: "Message sent successfully",
        data: contact,
      });
    }

    if (req.method === "GET") {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.json(contacts);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
