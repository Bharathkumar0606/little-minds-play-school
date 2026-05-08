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

const visitSchema = new mongoose.Schema({
  name: String,
  phone: String,
  childAge: String,
  date: String,
  time: String,
}, { timestamps: true });

const Visit = mongoose.models.Visit || mongoose.model("Visit", visitSchema);

export async function handler(event) {
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
      const visit = await Visit.create(body);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ message: "Visit scheduled successfully", data: visit }),
      };
    }

    if (event.httpMethod === "GET") {
      const visits = await Visit.find().sort({ createdAt: -1 });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(visits),
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
