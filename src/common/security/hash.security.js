import bcrypt from "bcrypt";
import { envVars } from "../../../config/index.js";

const generateHash = async (plainText) => {
  const hashedText = await bcrypt.hash(plainText, envVars.salt_round);
  return hashedText;
};

const compareHash = async (plainText, hashedText) => {
  const isEqual = await bcrypt.compare(plainText, hashedText);
  return isEqual;
};

export { generateHash, compareHash };
