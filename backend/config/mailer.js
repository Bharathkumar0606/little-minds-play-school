const nodemailer = require("nodemailer");

// Create reusable transporter
// Uses Gmail SMTP - requires an App Password (not your regular password)
// To generate: Google Account > Security > 2-Step Verification > App Passwords
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send a thank-you email after admission form submission
 */
const sendAdmissionEmail = async (toEmail, childName, parentName) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("⚠️ Email not configured. Skipping email send.");
    return null;
  }

  const mailOptions = {
    from: `"Innovative Play School" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🎉 Thank You for Your Admission Application - Innovative Play School",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6366f1, #06b6d4); padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🌟 Innovative Play School</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">Where Learning Meets Play!</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <h2 style="color: #1e293b; margin: 0 0 16px;">Thank You, ${parentName}! 🎉</h2>
          <p style="color: #475569; line-height: 1.6; margin: 0 0 16px;">
            We're thrilled to receive your admission application for <strong>${childName}</strong>. 
            Your child is about to embark on an amazing journey of learning through play!
          </p>
          <p style="color: #475569; line-height: 1.6; margin: 0 0 24px;">
            Our team will review your application and contact you within <strong>2 business days</strong> 
            to discuss the next steps.
          </p>

          <!-- Info Box -->
          <div style="background: #f0f9ff; border-left: 4px solid #06b6d4; padding: 16px; border-radius: 8px; margin: 0 0 24px;">
            <p style="color: #0e7490; margin: 0; font-weight: 600;">📋 What happens next?</p>
            <ul style="color: #475569; margin: 8px 0 0; padding-left: 20px; line-height: 1.8;">
              <li>Application review by our team</li>
              <li>Phone call to schedule a campus visit</li>
              <li>Meet our educators and see our facilities</li>
              <li>Complete enrollment process</li>
            </ul>
          </div>

          <!-- Contact -->
          <div style="background: #faf5ff; padding: 16px; border-radius: 8px; text-align: center;">
            <p style="color: #7c3aed; margin: 0 0 8px; font-weight: 600;">📞 Questions? Contact Us!</p>
            <p style="color: #475569; margin: 0;">Phone: <strong>8639133127</strong></p>
            <p style="color: #475569; margin: 4px 0 0;">📍 Subash Nagar, Nizamabad</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; margin: 0; font-size: 12px;">
            © ${new Date().getFullYear()} Innovative Play School. All rights reserved.
          </p>
          <p style="color: #94a3b8; margin: 4px 0 0; font-size: 12px;">
            Founded by Gangone Sreevalli
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email send error:", error.message);
    return null;
  }
};

/**
 * Send a confirmation email after visit scheduling
 */
const sendVisitEmail = async (toEmail, name, date, time) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("⚠️ Email not configured. Skipping email send.");
    return null;
  }

  const mailOptions = {
    from: `"Innovative Play School" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "📅 Visit Confirmed - Innovative Play School",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #10b981, #06b6d4); padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">📅 Visit Confirmed!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">Innovative Play School</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #1e293b; margin: 0 0 16px;">Hello ${name}! 👋</h2>
          <p style="color: #475569; line-height: 1.6; margin: 0 0 24px;">
            Your visit to Innovative Play School has been confirmed. We look forward to meeting you!
          </p>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 0 0 24px;">
            <p style="color: #166534; margin: 0 0 8px;"><strong>📆 Date:</strong> ${date}</p>
            <p style="color: #166534; margin: 0 0 8px;"><strong>🕐 Time:</strong> ${time}</p>
            <p style="color: #166534; margin: 0;"><strong>📍 Location:</strong> Subash Nagar, Nizamabad</p>
          </div>
          <div style="text-align: center;">
            <p style="color: #475569;">📞 Contact: <strong>8639133127</strong></p>
          </div>
        </div>
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Innovative Play School</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Visit email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Visit email send error:", error.message);
    return null;
  }
};

module.exports = { sendAdmissionEmail, sendVisitEmail };
