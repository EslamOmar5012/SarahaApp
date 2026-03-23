import jwt from "jsonwebtoken";
import { envVars } from "../../../config/index.js";
import { tokenTypeEnum } from "../enum/jwt.enum.js";

export const verifyToken = (token, secretKey) => {
  const verifiedToken = jwt.verify(token, secretKey);

  return verifiedToken;
};

export const createLoginTokens = ({ sub, issuer }) => {
  const accessToken = jwt.sign({ sub }, envVars.userAccessTokenSecretKey, {
    issuer,
    audience: [tokenTypeEnum.access],
    expiresIn: envVars.userAccessTokenExpireTime,
  });

  const refreshToken = jwt.sign({ sub }, envVars.userRefreshTokenSecretKey, {
    issuer,
    audience: [tokenTypeEnum.refresh],
    expiresIn: envVars.userRefreshTokenExpireTime,
  });

  return { accessToken, refreshToken };
};
