import mongoose from "mongoose";
import UserModel from "./models/user.model.js";
import { envVars } from "../../config/index.js";

export default async function CennectDB() {
  try {
    await mongoose.connect(envVars.db_url);

    await UserModel.syncIndexes();

    console.log("DB connected 🟢");
  } catch (error) {
    console.error("DB error ❌ : ", error.message);
  }
}
