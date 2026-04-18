import { onSuccessRespons } from "../../common/index.js";
import * as service from "./auth.service.js";

export const signup = async (req, res, next) => {
  const username = await service.signup(req.body);

  onSuccessRespons(res, `User created successfully, Wellcome ${username}`, 201);
};

export const signupGmail = async (req, res, next) => {
  const [method, data] = await service.signupGmail(
    req.body,
    `${req.protocol}://${req.host}`,
  );
  if (method === "signup")
    onSuccessRespons(res, "User SignedUp successfully", 201, data);

  if (method === "login")
    onSuccessRespons(res, "User logedIn successfully", 200, data);
};

export const login = async (req, res, next) => {
  const tokens = await service.login(req.body, `${req.protocol}://${req.host}`);

  onSuccessRespons(res, "User logged in successfully", 200, tokens);
};

export const loginGmail = async (req, res, next) => {
  const tokens = await service.loginGmail(
    req.body,
    `${req.protocol}://${req.host}`,
  );

  onSuccessRespons(res, "User logged in successfully", 200, tokens);
};

export const refreshToken = async (req, res, next) => {
  const newTokens = await service.refreshTokens(
    req.user,
    `${req.protocol}://${req.host}`,
  );

  onSuccessRespons(res, "Tokens refreshed successfully", 200, newTokens);
};
