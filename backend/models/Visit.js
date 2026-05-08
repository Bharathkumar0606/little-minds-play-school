const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  name: String,
  phone: String,
  childAge: String,
  date: String,
  time: String,
  // Google user info
  googleId: String,
  googleEmail: String,
  googleName: String,
  googlePhoto: String,
}, { timestamps: true });

module.exports = mongoose.model("Visit", visitSchema);
