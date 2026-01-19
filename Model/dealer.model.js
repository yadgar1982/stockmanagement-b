import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const dealerSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  accountNo: {
    type: String,
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
},{timestamps:true});

export default model("dealer", dealerSchema);

