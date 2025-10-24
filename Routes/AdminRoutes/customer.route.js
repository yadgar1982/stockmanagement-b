import express from "express";

const customerRouter = express.Router();
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  updateCustomer,
  getById
} from "../../Controller/customer.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";
//Customer registration route
//Private
//POST /api/customer/create
customerRouter.post("/create",verifyToken,isAdmin, createCustomer);

//Customer Update route
//Private
//PUT /api/customer/update/:id
customerRouter.put("/update/:id", verifyToken, updateCustomer);

//Customer Delete route
//Private
//DELETE /api/customer/delete/:id
customerRouter.delete("/delete/:id",verifyToken,isAdmin, deleteCustomer);

//Customer get route
//Public
//GET /api/customer/get/all
customerRouter.get("/get/all",  getAllCustomer);

//Customer get route
//Public
//get /api/customer/get/:id
customerRouter.get("/get/:id",  getById);


export default customerRouter;
