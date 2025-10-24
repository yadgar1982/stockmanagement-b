import { Schema, model } from "mongoose";

const stockModel = new Schema({
  stockName: {
    type: String,
    required: true,
    trim: true,
  },

  country: {
    type: String,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
  },
   stockManager: {
    type: String,
  }
 
},{timestamps:true});

export default model("stock", stockModel);

