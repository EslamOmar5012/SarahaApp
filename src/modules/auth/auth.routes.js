import { Router } from "express";
import { authentication } from "../../middlewares/index.js";
import * as controller from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", controller.signup);

authRouter.post("/login", controller.login);

authRouter.get(
  "/refresh-token",
  authentication("refresh"),
  controller.refreshToken,
);

export default authRouter;
