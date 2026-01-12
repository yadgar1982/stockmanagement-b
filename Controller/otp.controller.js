import bcrypt from "bcryptjs";
import userModel from "../Model/user.model.js";
import { sendEmail } from "../middlewares/sendEmail.js";
import dotenv from 'dotenv'
dotenv.config();
const LOGO=process.env.LOGO_URL;
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }
    console.log("user", user);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); padding: 30px; text-align: center;">
      <h2 style="color: #08678f; font-weight: 700; margin-bottom: 20px;">Password Reset OTP</h2>
      <p style="font-size: 16px; color: #555555; margin-bottom: 30px;">
        You requested to reset your password. Use the following OTP to proceed. 
        This OTP is valid for <strong>10 minutes</strong>.
      </p>
      <div style="font-size: 28px; font-weight: 700; color: #ffffff; background: linear-gradient(90deg, #08678f, #0a66c2ff); padding: 15px 0; border-radius: 8px; letter-spacing: 4px; margin-bottom: 30px;">
        ${otp}
      </div>
      <p style="font-size: 14px; color: #888888; margin-bottom: 0;">
        If you did not request this, please ignore this email.
      </p>
      <p style="font-size: 14px; color: #1e90ff; margin-bottom: 0;">
        Stock Management App. 
      </p>
    </div>
  </div>
`,
    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || !user.otp) {
      return res.status(400).json({ message: "Invalid request" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isValid = await bcrypt.compare(otp, user.otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user || !user.otp) {
      return res.status(400).json({ msg: "Invalid request" });
    }

    // OTP expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    // OTP check
    const isValidOtp = await bcrypt.compare(otp, user.otp);
    if (!isValidOtp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password + clear OTP
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({
      msg: "Password reset successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Password reset failed" });
  }
};

export const sendCustomEmailController = async (req, res) => {
  try {
    const { email, name, subject, message } = req.body;

    if (!email || !name || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    await sendEmail({
      to: 'hadiagroup2023@gmail.com',email,
      subject: subject || `Message from ${name}`,
      html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 50px 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); overflow: hidden;">
      
      <!-- Header -->
      <div style="display: flex; align-items: center; padding: 0 30px; background: linear-gradient(90deg, #08678f, #0a66c2);">
        <img src="https://www.hadiagold.com/logo.png" alt="Logo" style="width: 50px; height: auto; border-radius: 50%; margin-right: 15px; padding:2px" />

        <h1 style="color: #fff; font-size: 24px; font-weight: 700; margin: 0;">New Contact Form Message</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
        <p>Hello,</p>
        <p>You have received a new message from your website contact form. Details are below:</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; font-weight: 600; width: 120px;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: 600;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: 600;">Subject:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: 600;">Message:</td>
            <td style="padding: 10px;">${message}</td>
          </tr>
        </table>

        <p style="margin-top: 30px; font-size: 14px; color: #888888;">
          This email was sent from your website contact form. Please respond promptly.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f4f6f8; text-align: center; padding: 15px; font-size: 13px; color: #999999;">
        &copy; ${new Date().getFullYear()} Hadia Gold Group. All rights reserved.
      </div>

    </div>
  </div>
`,
    });

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send custom email:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
