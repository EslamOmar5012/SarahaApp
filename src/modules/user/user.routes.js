import { Router } from "express";
import { authentication } from "../../middlewares/index.js";
import * as controller from "./user.controller.js";

const userRouter = Router();

userRouter.get("/getProfile", authentication("access"), controller.getProfile);

export default userRouter;
