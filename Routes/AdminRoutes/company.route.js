import express from "express";

const companyRouter = express.Router();
import {
  createCompany,
  deleteCompany,
  getAllCompany,
  updateCompany,
  getById
} from "../../Controller/company.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";
//Company registration route
//Private
//POST /api/company/create
companyRouter.post("/create",verifyToken,isAdmin, createCompany);

//Company Update route
//Private
//PUT /api/company/update
companyRouter.put("/update/:id", verifyToken,isAdmin, updateCompany);

//Company Delete route
//Private
//delete /api/company/delete
companyRouter.delete("/delete/:id",verifyToken,isAdmin, deleteCompany);

//Company get route
//Public
//get /api/company/get/all
companyRouter.get("/get/all",  getAllCompany);


//Company get route
//Public
//get /api/company/get/:id
companyRouter.get("/get/:id",  getById);

export default companyRouter;
