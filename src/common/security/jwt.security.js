import jwt from "jsonwebtoken";
import { envVars } from "../../../config/index.js";

const getTokenCredentials = (role) => {
  switch (role) {
    case "user":
      return {
        access: envVars.user_access_secret_key,
        refresh: envVars.user_refresh_secret_key,
      };
    case "admin":
      return {
        access: envVars.admin_access_secret_key,
        refresh: envVars.admin_refresh_secret_key,
      };
  }
};

const generateTokens = (role, payload, issuer) => {
  const tokenCredentials = getTokenCredentials(role);

  const accessToken = jwt.sign({ sub: payload }, tokenCredentials.access, {
    issuer,
    audience: [role, "access"],
    expiresIn: envVars.access_token_ttl,
  });

  const refreshToken = jwt.sign({ sub: payload }, tokenCredentials.refresh, {
    issuer,
    audience: [role, "refresh"],
    expiresIn: envVars.refresh_token_ttl,
  });

  return { accessToken, refreshToken };
};

const verifyToken = (token, tokenType) => {
  const tokenData = jwt.decode(token);

  const tokenCredentials = getTokenCredentials(tokenData?.aud[0]);

  const verifiedToken = jwt.verify(token, tokenCredentials[tokenType]);

  return verifiedToken;
};

export { generateTokens, verifyToken };
