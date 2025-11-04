import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
   
  },
  sku: {
    type: String,
  },
  price: {
    type: Number,
    requied: true,
    trim: true,
  },
  unit: {
    type: String,
    requied: true,
    trim: true,
  },
  productCode: {
    type: String,
    trim: true,
    
  },
  
},{timestamps:true});

export default model("product", productSchema);

