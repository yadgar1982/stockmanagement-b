import mongoose, { Mongoose } from "mongoose";
import { Schema, model } from "mongoose";
const purchaseSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"product",
    },
    transactionId:{
      type:String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
     supplierName: {
      type: String,
      required:true
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"suppliers"
    },
    companyName: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"companies",
    },
    warehouseName: {
      type: String,
      required: true,
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
     ref:"stocks"
    },
    unitCost: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
    },
    exchangedAmt: {
      type: Number,
    },
    countryName: {
      type: String,
    },
   
    batch: {
      type: String,
    },
    dealerName: {
      type: String,
    },
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"dealers"
    },
    comission: {
      type: Number,
    },
    userName: {
      type: String,
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    description: {
      type: String,
    },
    totalCost:{
      type:Number,
    },
    totalLocalCost:{
      type:Number
    },
    isPassed: {
      type: Boolean,
    },
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const PurchaseModel = model("purchase", purchaseSchema);
export default PurchaseModel;
