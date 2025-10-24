import express from "express";

const supplierRouter = express.Router();
import {
  createSupplier,
  deleteSupplier,
  getAllSupplier,
  updateSupplier,
  getById
} from "../../Controller/supplier.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";
//supplier registration route
//Private
//POST /api/supplier/create
supplierRouter.post("/create",verifyToken,isAdmin, createSupplier);

//supplier Update route
//Private
//POST /api/supplier/update/:id
supplierRouter.put("/update/:id", verifyToken, updateSupplier);

//supplier Delete route
//Private
//POST /api/supplier/delete/:id
supplierRouter.delete("/delete/:id",verifyToken,isAdmin, deleteSupplier);

//supplier get route
//Private
//POST /api/supplier/get/all
supplierRouter.get("/get/all",  getAllSupplier);



//Supplier get route
//Public
//get /api/supplier/get/:id
supplierRouter.get("/get/:id",  getById);

export default supplierRouter;
