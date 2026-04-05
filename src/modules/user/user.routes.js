import { Router } from "express";
import { authentication, authorization } from "../../middlewares/index.js";
import * as controller from "./user.controller.js";

const userRouter = Router();

userRouter.get("/getProfile", authentication("access"), controller.getProfile);

userRouter.get(
  "/admin-only",
  authentication("access"),
  authorization("admin"),
  controller.adminOnly,
);

export default userRouter;
