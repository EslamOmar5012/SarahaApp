import { apiError, successResponse } from "../../common/index.js";
import { compareInput } from "../../common/index.js";
import { UserModel, DBrepository } from "../../db/index.js";

export const signupService = async (data) => {
  //check if user exist
  const user = await DBrepository.findOne({
    model: UserModel,
    filter: { email: data.email },
  });
  if (user) {
    apiError({ message: "user already exist", code: 409 });
  }

  //create new user
  const newUser = await DBrepository.create({ model: UserModel, data: [data] });

  return newUser;
};

export const logInService = async (data) => {
  const { email, password } = data;

  console.log(password);
  //get user from data base
  const user = await DBrepository.findOne({
    model: UserModel,
    filter: { email },
    select: "-provider -coverPicture -__v",
    options: { lean: true },
  });

  if (!user) {
    apiError({ message: "User not found", code: 404 });
  }
  const comparePassword = await compareInput(password, user.password);

  if (!comparePassword) {
    apiError({ message: "Invalid login credentials", code: 409 });
  }

  delete user.password;
  return user;
};

UserModel.findOneAndUpdate;
