import {Router} from "express";
import * as userController from "./user.controller.js";
import { apiError } from "../../common/index.js";


const userRouter = Router();

userRouter.post("/signup", userController.signupController);

export {userRouter};