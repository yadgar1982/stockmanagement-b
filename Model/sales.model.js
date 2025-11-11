import mongoose from "mongoose";
import { Schema, model } from "mongoose";
const saleSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
     customerName: {
      type: String,
      required:true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"customer"
    },
    companyName: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"company",
    },
    warehouseName: {
      type: String,
      required: true,
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
     ref:"stock"
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
      ref:"dealer"
    },
    comission: {
      type: Number,
    },
   totalComission:{
      type:Number
    },
     totalExComission:{
      type:Number
    },
    userName: {
      type: String,
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
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
     salesDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const SalesModel = model("sale", saleSchema);
export default SalesModel;
