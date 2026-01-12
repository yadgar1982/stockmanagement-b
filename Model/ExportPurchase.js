import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    // Product details
    productName: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    categoryName: String,
    quantity: { type: Number, required: true },
    unit: String,
    weight: Number,

    // Supplier / party
    supplierName: String,
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    party: String,

    // Customer (if applicable)
    customerName: String,
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },

    // Company info
    companyName: String,
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

    // Warehouse info
    warehouseName: String,
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },

    // Cost / currency
    unitCost: { type: Number, required: true },
    exchangedAmt: Number,
    totalCost: Number,
    totalLocalCost: Number,
    currency: { type: String, default: "USD" },

    // Dealer info
    dealerName: String,
    dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer" },

    // Commission
    comission: { type: Number, default: 0 },
    totalComission: { type: Number, default: 0 },
    totalExComission: { type: Number, default: 0 },

    // Batch & country
    batch: String,
    countryName: String,

    // User info
    userName: String,

    // Invoice / Order
    invoiceNo: { type: String, required: true, index: true },
    orderNo: String,

    // Sale / purchase info
    salePrice: Number,
    isPassed: { type: Boolean, default: false },
    purchaseDate: Date,
    salesDate: Date,

    // Description
    description: String,
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export default mongoose.model("Purchase", purchaseSchema);
