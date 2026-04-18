import { Router } from "express";
import { authentication, validation } from "../../middlewares/index.js";
import * as controller from "./auth.controller.js";
import { signupSchema } from "./auth.validation.js";

const authRouter = Router();

authRouter.post("/signup", validation(signupSchema), controller.signup);

authRouter.post("/signup/gmail", controller.signupGmail);

authRouter.post("/login", controller.login);

authRouter.post("login/gmail", controller.loginGmail);

authRouter.get(
  "/refresh-token",
  authentication("refresh"),
  controller.refreshToken,
);

export default authRouter;
