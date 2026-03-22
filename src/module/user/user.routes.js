import { Router } from "express";
import * as userController from "./user.controller.js";

const userRouter = Router();

userRouter.post("/signUp", userController.signupController);

userRouter.post("/signin", userController.signinController);

userRouter.get("/profile", userController.getProfileController);

export { userRouter };
