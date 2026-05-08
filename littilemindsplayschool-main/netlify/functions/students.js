import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set");
  }
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

const studentSchema = new mongoose.Schema({
  childName: String,
  age: String,
  parentName: String,
  phone: String,
  email: String,
  address: String,
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    await connectDB();

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body);
      const student = await Student.create(body);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ message: "Student saved successfully", data: student }),
      };
    }

    if (event.httpMethod === "GET") {
      const students = await Student.find().sort({ createdAt: -1 });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(students),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
