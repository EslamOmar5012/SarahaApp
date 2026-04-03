import {
  conflictError,
  notFoundError,
  compareHash,
  generateTokens,
} from "../../common/index.js";
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

export const login = async (inputs, issuer) => {
  //check for missing data
  const { email, password } = inputs;
  if (!email || !password) notFoundError("missing email or password");

  //get user fro database
  const user = await dbRepo.findOne({
    model: UserModel,
    filter: { email },
    select: "-__v",
  });

  if (!user) notFoundError("user don't exist");

  //check if password is right
  const checkPassword = await compareHash(password, user.password);
  if (!checkPassword) conflictError("Invalid credentials");

  const tokens = generateTokens(user.role, user._id, issuer);

  return tokens;
};
