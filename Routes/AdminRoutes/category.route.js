import express from "express";

const categoryRouter = express.Router();
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
  getById
} from "../../Controller/category.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";
//Company registration route
//Private
//POST /api/company/create
categoryRouter.post("/create",verifyToken,isAdmin, createCategory);

//Company Update route
//Private
//PUT /api/company/update
categoryRouter.put("/update/:id", verifyToken,isAdmin, updateCategory);

//Company Delete route
//Private
//delete /api/company/delete
categoryRouter.delete("/delete/:id",verifyToken,isAdmin, deleteCategory);

//Company get route
//Public
//get /api/company/get/all
categoryRouter.get("/get/all",  getAllCategory);


//Company get route
//Public
//get /api/company/get/:id
categoryRouter.get("/get/:id",  getById);

export default categoryRouter;
