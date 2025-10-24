import express from "express";

const productRouter = express.Router();
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  getById
} from "../../Controller/product.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";
//Product registration route
//Private
//POST /api/product/create
productRouter.post("/create",verifyToken,isAdmin, createProduct);

//Product Update route
//Private
//PUT /api/product/update
productRouter.put("/update/:id", verifyToken, updateProduct);

//Product Delete route
//Private
//delete /api/product/delete
productRouter.delete("/delete/:id",verifyToken,isAdmin, deleteProduct);

//Product get route
//Public
//get /api/product/get/all
productRouter.get("/get/all",  getAllProduct);


//Product get route
//Public
//get /api/product/get/:id
productRouter.get("/get/:id",  getById);

export default productRouter;
