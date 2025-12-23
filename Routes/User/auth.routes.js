import express from "express";
import { sendOtp, verifyOtp, resetPasswordWithOtp,sendCustomEmailController } from "../../Controller/otp.controller.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPasswordWithOtp);
router.post("/sendEmail", sendCustomEmailController);

export default router;