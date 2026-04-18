import { decrypt, notFoundError, ProviderEnum } from "../../common/index.js";
import { dbRepo, UserModel } from "../../db/index.js";

export const getProfile = async (userID) => {
  const user = await dbRepo.findById({
    model: UserModel,
    id: userID,
    select: "-password -__v -_id",
  });

  if (!user) notFoundError("user doesn't exist");

  if (user.provider === ProviderEnum.system)
    user.phone = await decrypt(user.phone);

  return user;
};
