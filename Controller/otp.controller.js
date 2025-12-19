import bcrypt from "bcryptjs";
import userModel from "../Model/user.model.js";
import {sendEmail} from "../middlewares/sendEmail.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body; 

  
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }
    console.log("user",user)
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
`
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
      msg: "Password reset successfully"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Password reset failed" });
  }
};