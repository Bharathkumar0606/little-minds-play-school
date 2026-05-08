const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: String,
  email: { type: String, required: true },
  photoURL: String,
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
