import express from "express";

const brandingRouter = express.Router();
import {
  createBranding,
  deleteBranding,
  getAllBranding,
  updateBranding,
  getById
} from "../../Controller/branding.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";
import { upload } from "../../middlewares/upload.middleware.js";
//Branding registration route
//Private
//POST /api/Branding/create
brandingRouter.post("/create",
  verifyToken,
  isAdmin, 
  upload.single("logo"),
  createBranding);

//Branding Update route
//Private
//PUT /api/Branding/update
brandingRouter.put("/update/:id",verifyToken,isAdmin,upload.single("logo"), updateBranding);

//Branding Delete route
//Private
//delete /api/Branding/delete
brandingRouter.delete("/delete/:id",verifyToken,isAdmin, deleteBranding);

//Branding get route
//Public
//get /api/Branding/get/all
brandingRouter.get("/get/all",  getAllBranding);


//Branding get route
//Public
//get /api/Branding/get/:id
brandingRouter.get("/get/:id",  getById);

export default brandingRouter;
