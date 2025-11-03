import express from "express";

const dealerRouter = express.Router();
import {
  createDealer,
  deleteDealer,
  getAllDealer,
  updateDealer,
  getById,

} from "../../Controller/dealer.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";

//Dealer registration route
//Private
//POST /api/dealer/create
dealerRouter.post("/create",verifyToken,isAdmin, createDealer);

//Dealer Update route
//Private
//POST /api/dealer/update/:id
dealerRouter.put("/update/:id", verifyToken, updateDealer);

//Dealer Delete route
//Private
//POST /api/dealer/delete/:id
dealerRouter.delete("/delete/:id",verifyToken,isAdmin, deleteDealer);

//Dealer get route
//Private
//POST /api/dealer/get/all
dealerRouter.get("/get/all",  getAllDealer);

//Dealer get route
//Public
//get /api/dealer/get/:id
dealerRouter.get("/get/:id",  getById);


export default dealerRouter;
