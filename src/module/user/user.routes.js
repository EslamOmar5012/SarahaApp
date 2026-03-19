import { Router } from "express";
import * as userController from "./user.controller.js";

const userRouter = Router();

userRouter.post("/signup", userController.signupController);

userRouter.post("/login", userController.loginController);

export { userRouter };
