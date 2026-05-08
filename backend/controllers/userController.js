const User = require("../models/User");

exports.saveUser = async (req, res) => {
  try {
    const { googleId, displayName, email, photoURL } = req.body;

    // Upsert: update if exists, create if not
    const user = await User.findOneAndUpdate(
      { googleId },
      { googleId, displayName, email, photoURL, lastLogin: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "User saved successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
