const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  childName: String,
  age: String,
  parentName: String,
  phone: String,
  email: String,
  address: String,
  // Google user info
  googleId: String,
  googleEmail: String,
  googleName: String,
  googlePhoto: String,
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);