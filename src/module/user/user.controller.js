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
  const tokens = await userService.signinService(
    email,
    password,
    req.protocol,
    req.host,
  );

  successResponse({
    response: res,
    code: 200,
    message: "user logged in",
    data: tokens,
  });
};

export const getProfileUserController = async (req, res, next) => {
  const user = await userService.getProfileUserService(
    req.headers.authorization,
  );

  successResponse({
    response: res,
    code: 200,
    message: "profile data",
    data: user,
  });
};

export const getProfileAdminController = async (req, res, next) => {
  const user = await userService.getProfileAdminService(
    req.headers.authorization,
  );

  successResponse({
    response: res,
    code: 200,
    message: "profile data",
    data: user,
  });
};

export const refreshTokenController = async (req, res, next) => {
  const newTokens = await userService.refreshTokenService(
    req.headers.authorization,
    req.protocol,
    req.host,
  );

  successResponse({
    response: res,
    code: 200,
    message: "tokens refreshed successfully",
    data: newTokens,
  });
};
