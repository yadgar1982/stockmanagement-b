import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    productName: String,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    categoryName: String,

    quantity: Number,
    unit: String,
    weight: Number,

    customerName: String,
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    companyName: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    warehouseName: String,
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },

    unitCost: Number,
    exchangedAmt: Number,

    countryName: String,
    batch: String,
    party: String,

    dealerName: String,
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealer",
    },

    comission: Number,
    totalComission: Number,
    totalExComission: Number,

    userName: String,

    invoiceNo: {
      type: String,
      required: true,
      index: true,
    },

    description: String,

    totalCost: Number,
    totalLocalCost: Number,

    currency: {
      type: String,
      default: "USD",
    },

    isPassed: {
      type: Boolean,
      default: false,
    },

    salesDate: Date,
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model("Sale", saleSchema);
