import { envVars } from "../../../config/index.js";
import {
  apiError,
  decrypt,
  compareInput,
  verifyToken,
  createLoginTokens,
} from "../../common/index.js";
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

export const signinService = async (email, password, protocol, host) => {
  //check if request body inputs are right
  if (!email || !password)
    apiError({ message: "email or password missed", code: 401 });

  //get user from data base
  const user = await DBrepository.findOne({
    model: UserModel,
    filter: { email },
  });

  //check if user exist
  if (!user) apiError({ message: "user not exist", code: 404 });

  //check if password is right
  const passwordIsCorrect = compareInput(password, user.password);

  if (!passwordIsCorrect)
    apiError({ message: "invalid credentials", code: 409 });

  //create access token
  const loginTokens = createLoginTokens({
    sub: user._id,
    issuer: `${protocol}://${host}`,
  });

  return loginTokens;
};

export const getProfileService = async (token) => {
  //verify token
  const verifiedToken = verifyToken(token, envVars.userAccessTokenSecretKey);

  //check if token is invalid and type of it
  if (!verifiedToken || verifiedToken?.aud[0] !== "access")
    apiError({ message: "invalid credentials", code: 409 });

  //get profile data
  const user = await DBrepository.findById({
    model: UserModel,
    id: verifiedToken.sub,
  });

  //decrypt phone number
  user.phone = decrypt(user.phone);

  //delete user password
  user.password = undefined;

  return user;
};

export const refreshTokenService = async (token, protocol, host) => {
  //verify refresh token
  const verifiedRefreshToken = verifyToken(
    token,
    envVars.userRefreshTokenSecretKey,
  );

  console.log(verifiedRefreshToken);

  if (!verifiedRefreshToken || verifiedRefreshToken?.aud[0] !== "refresh")
    apiError({ message: "invalid refresh token", code: 401 });

  //check if user still exist
  const user = await DBrepository.findById({
    model: UserModel,
    id: verifiedRefreshToken.sub,
  });

  if (!user) apiError({ message: "user doesn't exist", code: 404 });

  const newTokens = createLoginTokens({
    sub: verifiedRefreshToken.sub,
    issuer: `${protocol}://${host}`,
  });

  return newTokens;
};
