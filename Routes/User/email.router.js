import express from "express";

const emailRouter = express.Router();
import {sendOtp}from "../../Controller/otp.controller.js"

//Sending OTP
//Public
//POST /api/user/create
emailRouter.post("/otp",sendOtp);

export default emailRouter;
