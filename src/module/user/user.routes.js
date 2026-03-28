import { Router } from "express";
import * as userController from "./user.controller.js";
import { authentication, authorization } from "../../middleware/index.js";

const userRouter = Router();

userRouter.post("/signUp", userController.signupController);

userRouter.post("/signin", userController.signinController);

userRouter.get(
  "/getprofile",
  authentication(),
  userController.getProfileController,
);

userRouter.get(
  "/adminonly",
  authentication(),
  authorization(["admin"]),
  userController.adminOnlyController,
);

userRouter.get(
  "/refreshToken",
  authentication(),
  userController.refreshTokenController,
);

export { userRouter };
