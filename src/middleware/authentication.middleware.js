import { apiError, tokenTypeEnum } from "../common/index.js";
import { getSignatures, verifyToken } from "../common/index.js";
import jwt from "jsonwebtoken";

const authentication = () => {
  return (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
      apiError({ message: "missing authentication", code: 404 });

    const [method, token] = authorization.split(" ");
    const auth_data = jwt.decode(token);
    const jwt_keys = getSignatures(auth_data.aud[1]);

    const verifiedToken = verifyToken(token, jwt_keys[auth_data.aud[0]]);

    if (!verifiedToken) {
      apiError({ message: "Invalid credentials", code: 409 });
    }

    req.token = verifiedToken;

    next();
  };
};

export default authentication;
