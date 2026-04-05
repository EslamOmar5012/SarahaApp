import { conflictError, verifyToken } from "../common/index.js";

const authorization = (role) => {
  return (req, res, next) => {
    if (req.token.aud[0] !== role) conflictError("user not authorized");

    next();
  };
};

export default authorization;
