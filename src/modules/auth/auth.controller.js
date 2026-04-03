import { onSuccessRespons } from "../../common/index.js";
import * as service from "./auth.service.js";

export const signup = async (req, res, next) => {
  const username = await service.signup(req.body);

  onSuccessRespons(res, `User created successfully, Wellcome ${username}`, 201);
};
