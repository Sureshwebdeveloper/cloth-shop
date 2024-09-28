import express from "express"
import { loginUser,adminLogin,registerUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/login",loginUser)
userRouter.post("/register",registerUser)
userRouter.post("/admin-login",adminLogin)

export default userRouter;