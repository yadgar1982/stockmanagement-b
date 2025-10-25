import { Schema, model } from "mongoose";

const companySchema = new Schema({
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
  role: {
    type: String,
    required: true,
  },
  transaction:[
    {
      credit:{type:Number,default:0},
      debit:{type:Number,default:0},
      description:{type:Number,default:0},
      date: { type: Date, default: Date.now }
    }
  ],
  avatar: {
    type: String,
  },
},{timestamps:true});

export default model("company", companySchema);

