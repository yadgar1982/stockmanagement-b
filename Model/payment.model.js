import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    // Who the payment is linked to
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "supplier" },
    supplierName: { type: String },

    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
    customerName: { type: String },

    dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "dealer" },
    dealerName: { type: String },

    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
    companyName: { type: String },


    amount: { type: Number, required: true },
    paymentNo: { type: String, required: true },
    currency: { type: String },
    exchangedAmt: { type: Number },
    countryName: { type: String },
    paymentType: { type: String },         
    transactionType: { type: String },     
    description: { type: String },
   
    isPassed: { type: Boolean, default: false },
    paymentDate: {type:Date}, 
    userName: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const PaymentModel = model("payments", paymentSchema);
export default PaymentModel; 