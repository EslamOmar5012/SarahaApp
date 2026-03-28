import jwt from "jsonwebtoken";
import { envVars } from "../../../config/index.js";
import { tokenTypeEnum } from "../enum/jwt.enum.js";

export const getSignatures = (role) => {
  switch (role) {
    case "admin":
      return {
        access: envVars.adminAccessTokenSecretKey,
        refresh: envVars.adminRefreshTokenSecretKey,
      };
    default:
      return {
        access: envVars.userAccessTokenSecretKey,
        refresh: envVars.userRefreshTokenSecretKey,
      };
  }
};

export const verifyToken = (token, secretKey) => {
  const verifiedToken = jwt.verify(token, secretKey);

  return verifiedToken;
};

export const createLoginTokens = ({ sub, issuer, role }) => {
  //get signature level
  const tokens = getSignatures(role);

  const accessToken = jwt.sign({ sub }, tokens.access, {
    issuer,
    audience: [tokenTypeEnum.access, role],
    expiresIn: envVars.userAccessTokenExpireTime,
  });

  const refreshToken = jwt.sign({ sub }, tokens.refresh, {
    issuer,
    audience: [tokenTypeEnum.refresh, role],
    expiresIn: envVars.userRefreshTokenExpireTime,
  });

  return { accessToken, refreshToken };
};
