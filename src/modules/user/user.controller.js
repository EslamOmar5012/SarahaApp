import { onSuccessRespons } from "../../common/index.js";
import * as service from "./user.service.js";

export const getProfile = async (req, res, next) => {
  const user = await service.getProfile(req.user);

  onSuccessRespons(res, "user data retrieved successfully", 200, user);
};

export const adminOnly = async (req, res, next) => {
  onSuccessRespons(res, "user have access", 200);
};
