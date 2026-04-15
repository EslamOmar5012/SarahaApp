import { Router } from "express";
import { authentication } from "../../middlewares/index.js";
import * as controller from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", controller.signup);

authRouter.post("/signup/gmail", controller.signupGmail);

authRouter.post("/login", controller.login);

authRouter.post("login/gmail", controller.loginGmail);

authRouter.get(
  "/refresh-token",
  authentication("refresh"),
  controller.refreshToken,
);

export default authRouter;
