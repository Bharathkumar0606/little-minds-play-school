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

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

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
      const contact = await Contact.create(body);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ message: "Message sent successfully", data: contact }),
      };
    }

    if (event.httpMethod === "GET") {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(contacts),
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
