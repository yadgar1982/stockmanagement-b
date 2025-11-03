import express from "express";

import {
  createPayment,
  getAllPayment,
  deletePayment,
  updatePayment,
  getPaymentById
} from "../../Controller/payment.controller.js";
const paymentsRouter = express.Router();

//@ Create sale
//@ POST /api/sale/create
//@Private
paymentsRouter.post("/create", createPayment);

//@ Create sale
//@ POST /api/sale/create
//@Private
paymentsRouter.get("/get", getAllPayment);


//@ Delete Purchase
//@ DELETE /api/purchase/delete
//@Private
paymentsRouter.get("/get/:id", getPaymentById);

//@ Delete sale
//@ DELETE /api/sale/delete
//@Private
paymentsRouter.delete("/delete/:id", deletePayment);


//@ Update sale
//@ UPDATE /api/sale/update
//@Private
paymentsRouter.put("/update/:id", updatePayment);

export default paymentsRouter;
