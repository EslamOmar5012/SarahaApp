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

export const getProfileController = async (req, res, next) => {
  const { token } = req;
  const user = await userService.getProfileService(token);

  successResponse({
    response: res,
    code: 200,
    message: "profile data",
    data: user,
  });
};

export const adminOnlyController = async (req, res, next) => {
  successResponse({
    response: res,
    code: 200,
    message: "can access admin endpoint",
  });
};

export const refreshTokenController = async (req, res, next) => {
  //get data from request
  const { token, protocol, host } = req;
  const newTokens = await userService.refreshTokenService(
    token,
    protocol,
    host,
  );

  successResponse({
    response: res,
    code: 200,
    message: "tokens refreshed successfully",
    data: newTokens,
  });
};
