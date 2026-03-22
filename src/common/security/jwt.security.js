import jwt from "jsonwebtoken";
import { envVars } from "../../../config/index.js";

export const signToken = ({ sub, options = undefined }) => {
  const token = jwt.sign({ sub }, envVars.accessTokenSecretKey, options);

  return token;
};

export const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, envVars.accessTokenSecretKey);

  return verifiedToken;
};
