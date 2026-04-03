import { conflictError } from "../../common/index.js";
import { dbRepo, UserModel } from "../../db/index.js";

export const signup = async (inputs) => {
  //check if user exist or not
  const userExist = await dbRepo.findOne({
    model: UserModel,
    filter: { email: inputs.email },
    select: "-password",
  });

  if (userExist) conflictError("User already exist");

  //add user to data base
  const [user] = await dbRepo.create({ model: UserModel, data: [inputs] });

  return user.username;
};
