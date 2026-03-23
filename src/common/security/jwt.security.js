import jwt from "jsonwebtoken";
import { envVars } from "../../../config/index.js";

export const signToken = ({ sub, options = undefined, signature }) => {
  const token = jwt.sign({ sub }, signature, options);

  return token;
};

export const verifyToken = (token, signature) => {
  const verifiedToken = jwt.verify(token, signature);

  return verifiedToken;
};
