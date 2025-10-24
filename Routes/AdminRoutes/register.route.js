import express from "express";

const userRouter = express.Router();
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUser
} from "../../Controller/user.controller.js";
import { verifyToken, isAdmin } from "../../middlewares/auth.middlewares.js";
//User registration route
//Private
//POST /api/user/create
userRouter.post("/create",verifyToken,isAdmin, createUser);

//User Update route
//Private
//POST /api/user/update
userRouter.put("/update/:id", verifyToken, updateUser);

//User Delete route
//Private
//POST /api/user/delete
userRouter.delete("/delete/:id",verifyToken,isAdmin, deleteUser);

//User get route
//Private
//POST /api/user/get/all
userRouter.get("/get/all",  getAllUser);

export default userRouter;
