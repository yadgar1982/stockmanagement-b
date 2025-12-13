import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
},{timestamps:true});

export default model("category", categorySchema);

