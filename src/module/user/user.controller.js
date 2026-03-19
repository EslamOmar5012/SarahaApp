import { successResponse } from "../../common/index.js";
import * as userService from "./user.service.js";

export const signupController = async (req, res, next) => {
  const newUser = await userService.signupService(req.body);

  successResponse({
    response: res,
    code: 201,
    message: "user created successfully",
    data: newUser,
  });
};

export const loginController = async (req, res, next) => {
  const user = await userService.logInService(req.body);

  successResponse({
    response: res,
    code: 200,
    data: user,
  });
};
