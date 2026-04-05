import { onSuccessRespons } from "../../common/index.js";
import * as service from "./auth.service.js";

export const signup = async (req, res, next) => {
  const username = await service.signup(req.body);

  onSuccessRespons(res, `User created successfully, Wellcome ${username}`, 201);
};

export const login = async (req, res, next) => {
  const tokens = await service.login(req.body, `${req.protocol}://${req.host}`);

  onSuccessRespons(res, "User logged in successfully", 200, tokens);
};

export const refreshToken = async (req, res, next) => {
  const newTokens = await service.refreshTokens(
    req.user,
    `${req.protocol}://${req.host}`,
  );

  onSuccessRespons(res, "Tokens refreshed successfully", 200, newTokens);
};
