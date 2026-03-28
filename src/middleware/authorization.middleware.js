import { apiError } from "../common/index.js";

const authorization = (accessRoles = []) => {
  return (req, res, next) => {
    const check_credentials = accessRoles.includes(req.token?.aud[1]);

    if (!check_credentials)
      apiError({ message: "Invalid credentials", code: 401 });

    next();
  };
};

export default authorization;
