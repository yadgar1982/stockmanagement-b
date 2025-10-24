import express from "express";

import {
  createSale,
  getAllSale,
  deleteSale,
  updateSale,
} from "../../Controller/sales.controller.js";
const salesRouter = express.Router();

//@ Create sale
//@ POST /api/sale/create
//@Private
salesRouter.post("/create", createSale);

//@ Create sale
//@ POST /api/sale/create
//@Private
salesRouter.get("/get", getAllSale);

//@ Delete sale
//@ DELETE /api/sale/delete
//@Private
salesRouter.delete("/delete/:id", deleteSale);

//@ Update sale
//@ UPDATE /api/sale/update
//@Private
salesRouter.put("/update/:id", updateSale);

export default salesRouter;
