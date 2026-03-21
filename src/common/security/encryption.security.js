import crypto from "node:crypto";
import { envVars } from "../../../config/index.js";

const generateKey = (salt) => {
  const key = crypto.pbkdf2Sync(
    envVars.encryptionKey,
    salt,
    100000,
    32,
    "sha512",
  );
  return key;
};

export const encrypt = (plainText) => {
  const iv = crypto.randomBytes(16);
  const salt = crypto.randomBytes(64);

  const key = generateKey(salt);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encryptedText = cipher.update(plainText, "utf-8", "hex");

  encryptedText += cipher.final("hex");

  return `${iv.toString("hex")}:${salt.toString("hex")}:${encryptedText}`;
};

export const dcrypt = (encryptedText) => {
  const [iv, salt, text] = encryptedText.split(":");

  const binaryIV = Buffer.from(iv, "hex");
  const binarySalt = Buffer.from(salt, "hex");
  const key = generateKey(binarySalt);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, binaryIV);

  let plainText = decipher.update(text, "hex", "utf-8");

  plainText += decipher.final("utf-8");

  return plainText;
};
