const Visit = require("../models/Visit");
const { sendVisitEmail } = require("../config/mailer");

exports.addVisit = async (req, res) => {
  try {
    const visit = new Visit(req.body);
    await visit.save();

    // Send confirmation email to the user's Google email
    const emailTo = req.body.googleEmail;
    if (emailTo) {
      await sendVisitEmail(emailTo, req.body.name, req.body.date, req.body.time);
    }

    res.status(201).json({ message: "Visit scheduled successfully", data: visit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVisits = async (req, res) => {
  try {
    const visits = await Visit.find().sort({ createdAt: -1 });
    res.json(visits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
