import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Product-related
    productName: String,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    categoryName: String,
    quantity: Number,
    unit: String,
    weight: Number,

    // Customer
    customerName: String,
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    // Company
    companyName: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    // Warehouse
    warehouseName: String,
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },

    // Costs
    unitCost: Number,
    exchangedAmt: Number,
    totalCost: Number,
    totalLocalCost: Number,
    comission: Number,
    totalComission: Number,
    totalExComission: Number,
    currency: {
      type: String,
      default: "USD",
    },

    // Dealer
    dealerName: String,
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealer",
    },

    // Invoice
    invoiceNo: {
      type: String,
      required: function () {
        // Only required if this is a sale, not a payment
        return !this.paymentNo;
      },
      index: true,
    },

    // Payment-related fields
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    supplierName: String,
    transBy: String,
    entity: String, 
    amount: Number,
    paymentNo: String,
    paymentType: String,
    transactionType: String, 
    partyNo: String,
    paymentDate: Date,

    // General
    party: String,
    countryName: String,
    batch: String,
    userName: String,
    description: String,

    // Flags
    isPassed: {
      type: Boolean,
      default: false,
    },

    // Dates
    salesDate: Date, // for sale
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model("Sale", paymentSchema);
