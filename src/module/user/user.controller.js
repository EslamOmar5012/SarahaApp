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

export const signinController = async (req, res, next) => {
  const { email, password } = req.body;
  const accessToken = await userService.signinService(
    email,
    password,
    req.protocol,
    req.host,
  );

  successResponse({
    response: res,
    code: 200,
    message: "user logged in",
    data: { accessToken },
  });
};

export const getProfileController = async (req, res, next) => {
  const user = await userService.getProfileService(req.headers.authorization);

  successResponse({
    response: res,
    code: 200,
    message: "profile data",
    data: user,
  });
};
