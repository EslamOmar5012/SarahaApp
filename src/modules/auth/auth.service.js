import {
  conflictError,
  notFoundError,
  compareHash,
  generateTokens,
  verifyGoogleToken,
  ProviderEnum,
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

export const signupGmail = async (bodyData, issuer) => {
  const { idToken } = bodyData;

  const payload = await verifyGoogleToken(idToken);

  if (!payload.email_verified) conflictError("Email isn't verified");

  const user = await dbRepo.findOne({
    model: UserModel,
    filter: { email: payload.email },
  });

  if (user) {
    if (user.providor === ProviderEnum.system)
      conflictError("user already exist please login with system email");

    return ["login", await loginGmail(bodyData, issuer)];
  }
  const newUser = await dbRepo.create({
    model: UserModel,
    data: [
      {
        username: payload.name,
        email: payload.email,
        profilePic: payload.picture,
        provider: ProviderEnum.google,
        confirmEmail: true,
      },
    ],
  });

  return ["signup", newUser];

  //   {
  //   iss: 'https://accounts.google.com',
  //   azp: '247901318303-v6a9kkutbij1pnq1dd3n98spd1jg3oln.apps.googleusercontent.com',
  //   aud: '247901318303-v6a9kkutbij1pnq1dd3n98spd1jg3oln.apps.googleusercontent.com',
  //   sub: '103294969917778131802',
  //   email: 'eslamelkhabery60@gmail.com',
  //   email_verified: true,
  //   nbf: 1776194478,
  //   name: 'Eslam Elkhabery',
  //   picture: 'https://lh3.googleusercontent.com/a/ACg8ocJPq9UTXCN-gWEQvrJ3t9-b-ZTwYrVMl9dOtnZTlsbOlNIoyA=s96-c',
  //   given_name: 'Eslam',
  //   family_name: 'Elkhabery',
  //   iat: 1776194778,
  //   exp: 1776198378,
  //   jti: 'aa16fed20675a4b2688a0a9470630c52980d4ac0'
  // }

  // const userid = payload["sub"];
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

  if (!user || user.provider === ProviderEnum.google)
    notFoundError("user don't exist");

  //check if password is right
  const checkPassword = await compareHash(password, user.password);
  if (!checkPassword) conflictError("Invalid credentials");

  const tokens = generateTokens(user.role, user._id, issuer);

  return tokens;
};

export const loginGmail = async (bodyData, issuer) => {
  const { idToken } = bodyData;

  const payload = await verifyGoogleToken(idToken);

  if (!payload.email_verified) conflictError("user isn't verified");

  const user = await dbRepo.findOne({
    model: UserModel,
    filter: { email: payload.email, provider: ProviderEnum.google },
  });

  if (!user) {
    const newUser = await signupGmail(idToken);

    const tokens = generateTokens(newUser.role, newUser._id, issuer);

    return tokens;
  }

  const tokens = generateTokens(user.role, user._id, issuer);

  return tokens;
};

export const refreshTokens = async (userId, issuer) => {
  //check if user exist
  const user = await dbRepo.findById({
    model: UserModel,
    id: userId,
    select: "-password",
  });

  if (!user) notFoundError("User dosn't exist any more");

  const newTokens = generateTokens(user.role, user._id, issuer);

  return newTokens;
};
