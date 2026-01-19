import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
    requied: false,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
    address: {
    type: String,
    requied: false,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  otp: String,
  otpExpires: Date,
},{timestamps:true});

export default model("user", userSchema);

