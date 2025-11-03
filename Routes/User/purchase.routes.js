import express from "express";

import {
  createPurchase,
  getAllPurchase,
  deletePurchase,
  updatePurchase,
  getPurchaseById
} from "../../Controller/purchase.controller.js";
const purchaseRouter = express.Router();

//@ Create Purchase
//@ POST /api/purchase/create
//@Private
purchaseRouter.post("/create", createPurchase);

//@ Create Purchase
//@ POST /api/purchase/create
//@Private
purchaseRouter.get("/get", getAllPurchase);

//@ Delete Purchase
//@ DELETE /api/purchase/delete
//@Private
purchaseRouter.delete("/delete/:id", deletePurchase);

//@ Delete Purchase
//@ DELETE /api/purchase/delete
//@Private
purchaseRouter.get("/get/:id", getPurchaseById);

//@ Update Purchase
//@ UPDATE /api/purchase/update
//@Private
purchaseRouter.put("/update/:id", updatePurchase);

export default purchaseRouter;
