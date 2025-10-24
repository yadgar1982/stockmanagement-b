import express from "express";

const currencyRouter = express.Router();
import {
  createCurrency,
  deleteCurrency,
  getAllCurrency,
  updateCurrency,
  getById
} from "../../Controller/currency.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";
//Currency registration route
//Private
//POST /api/currency/create
currencyRouter.post("/create",verifyToken,isAdmin, createCurrency);

//Currency Update route
//Private
//POST /api/currency/update
currencyRouter.put("/update/:id", verifyToken, updateCurrency);

//Currency Delete route
//Private
//POST /api/currency/delete
currencyRouter.delete("/delete/:id",verifyToken,isAdmin, deleteCurrency);

//Currency get route
//Private
//POST /api/currency/get/all
currencyRouter.get("/get/all",  getAllCurrency);


//Currency get route
//Public
//get /api/cuurrency/get/:id
currencyRouter.get("/get/:id",  getById);

export default currencyRouter;
