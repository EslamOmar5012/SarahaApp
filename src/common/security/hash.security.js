import { hash, compare } from "bcrypt";
import { envVars } from "../../../config/index.js";

export const hashInput = async (input) => {
  const hashedInput = await hash(input, +envVars.saltRound);
  return hashedInput;
};

export const compareInput = async (input, hashedInput) => {
  const isSame = await compare(input, hashedInput);
  return isSame;
};
