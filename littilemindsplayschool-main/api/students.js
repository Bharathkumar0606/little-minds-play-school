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
const studentSchema = new mongoose.Schema({
  childName: String,
  age: String,
  parentName: String,
  phone: String,
  email: String,
  address: String,
});

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

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
      console.log("📥 Incoming Data:", req.body);
      const student = await Student.create(req.body);
      console.log("✅ Saved:", student);
      return res.status(201).json({
        message: "Student saved successfully",
        data: student,
      });
    }

    if (req.method === "GET") {
      const students = await Student.find();
      return res.json(students);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
