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
      ref:"Supplier"
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
    isPassed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const PurchaseModel = model("purchase", purchaseSchema);
export default PurchaseModel;
