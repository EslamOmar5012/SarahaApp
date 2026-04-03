import { Router } from "express";
import * as controller from "./auth.controller.js";

const authRouter = Router();

authRouter.use("/signup", controller.signup);

export default authRouter;
