import { conflictError, verifyToken } from "../common/index.js";

const authentication = (tokenType) => {
  return async (req, res, next) => {
    const [method, token] = req.headers.authorization.split(" ");

    const verifiedToken = verifyToken(token, tokenType);

    if (!verifiedToken) conflictError("invalid credentials");

    req.user = String(verifiedToken.sub);

    next();
  };
};

export default authentication;
