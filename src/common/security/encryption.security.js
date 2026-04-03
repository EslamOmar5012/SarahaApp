import crypto from "node:crypto";
import { envVars } from "../../../config/index.js";

const generateKey = (salt) => {
  const key = crypto.pbkdf2Sync(
    envVars.encryption_secret_key,
    salt,
    100000,
    envVars.key_length,
    "sha512",
  );

  return key;
};

const encrypt = async (plainText) => {
  const iv = crypto.randomBytes(envVars.iv_length);
  const salt = crypto.randomBytes(envVars.salt_length);
  const key = generateKey(salt);

  const cipher = crypto.createCipheriv(envVars.algorithm_type, key, iv);

  let encryptedText = cipher.update(plainText, "utf-8", "hex");

  encryptedText += cipher.final("hex");

  return `${iv.toString("hex")}:${salt.toString("hex")}:${encryptedText}`;
};

const decrypt = async (encrypted) => {
  let [iv, salt, encryptedText] = encrypted.split(":");

  iv = Buffer.from(iv, "hex");
  salt = Buffer.from(salt, "hex");
  const key = generateKey(salt);

  const decipher = crypto.createDecipheriv(envVars.algorithm_type, key, iv);

  let plainText = decipher.update(encryptedText, "hex", "utf-8");

  plainText += decipher.final("utf-8");

  return plainText;
};

export { encrypt, decrypt };
