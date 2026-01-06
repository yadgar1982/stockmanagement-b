import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const wareHouseSchema = new Schema(
   {
    transactionId:{
      type:String,
    },
    transaction:{
      type:String,
    },
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
     weight: {
      type: Number,
    },
     supplierName: {
      type: String,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"supplier"
    },
     customerName: {
      type: String,
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
     ref:"stocks"
    },
    unitCost: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
    },
    exCurrency: {
      type: String,
    },
    exchangedAmt: {
      type: Number,
    },
    countryName: {
      type: String,
    },
    party: {
      type: String,
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
    salePrice:{
      type:Number,
    },
     totalLocalCost:{
      type:Number
    },
    orderNo:{
        type:String,
      },
    transactionType:{
        type:String,
      },
    isTransfer: {
      type: Boolean,
    },
    transactionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const WareHouseModel = model("warehouse", wareHouseSchema);
export default WareHouseModel; 