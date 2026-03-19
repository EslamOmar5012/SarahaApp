import { apiError } from "../../common/index.js";
import { UserModel } from "../../db/model/user.model.js";

export const signupService = async (data) => {
  //check if user exist
  const user = await UserModel.findOne({ email: data.email });
  if (user) {
    apiError({ message: "user already exist", code: 409 });
  }

  //create new user
  const newUser = await UserModel.create([data], { validateBeforeSave: true });

  return newUser;
};

export const logInService = async (data) => {
  const { email, password } = data;
  //get user from data base
  const user = await UserModel.findOne({ email, password });
  if (user) {
    return user;
  } else {
    apiError({ message: "invalid login credentials", code: 404 });
  }
};

UserModel.findOneAndUpdate;
