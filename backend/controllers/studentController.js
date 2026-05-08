const Student = require("../models/Student");
const { sendAdmissionEmail } = require("../config/mailer");

exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    // Send thank-you email to the user's Google email (or form email)
    const emailTo = req.body.googleEmail || req.body.email;
    if (emailTo) {
      await sendAdmissionEmail(emailTo, req.body.childName, req.body.parentName);
    }

    res.status(201).json({ message: "Student saved successfully", data: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};