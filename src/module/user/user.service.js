import { apiError } from "../../common/index.js";
import { UserModel } from "../../db/model/user.model";

export const signupService = async (data) => {
  //check if user exist
  const user = await UserModel.findOne({ email: data.email });
  if (user) {
    apiError({ message: "user already exist", code: 409 });
  }

  //create new user
  const newUser = await UserModel.create([data], { validateBeforeSave: true });
};
