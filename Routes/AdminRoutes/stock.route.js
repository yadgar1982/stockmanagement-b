import express from "express";

const stockRouter = express.Router();
import {
  creatStock,
  deleteStock,
  getAllStock,
  updateStock,
  getById
} from "../../Controller/stock.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";
//Company registration route
//Private
//POST /api/company/create
stockRouter.post("/create",verifyToken,isAdmin, creatStock);

//Company registration route
//Private
//POST /api/company/create
stockRouter.post("/create",verifyToken,isAdmin, creatStock);

//Company Update route
//Private
//PUT /api/company/update
stockRouter.put("/update/:id", verifyToken,isAdmin, updateStock);

//Company Delete route
//Private
//delete /api/company/delete
stockRouter.delete("/delete/:id",verifyToken,isAdmin, deleteStock);

//Company get route
//Public
//get /api/company/get/all
stockRouter.get("/get/all",  getAllStock);


//Company get route
//Public
//get /api/company/get/:id
stockRouter.get("/get/:id",  getById);

export default stockRouter;
