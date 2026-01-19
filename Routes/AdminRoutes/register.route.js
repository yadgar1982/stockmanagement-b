import express from "express";

const userRouter = express.Router();
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail
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

//User Update route
//Private
//POST /api/user/update
userRouter.put("/updatebyemail/:email", updateUserByEmail);

//User Delete route
//Private
//POST /api/user/delete
userRouter.delete("/delete/:id",verifyToken,isAdmin, deleteUser);

//User Delete route
//Private
//POST /api/user/delete
userRouter.delete("/deleteUserbyemail/:email",verifyToken,isAdmin, deleteUserByEmail);

//User get route
//Private
//POST /api/user/get/all
userRouter.get("/get/all",  getAllUser);
//User get route
//Private
//POST /api/user/get/all
userRouter.get("/get/:email",  getUserByEmail);

export default userRouter;
