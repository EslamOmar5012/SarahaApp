import mongoose from "mongoose";
import { envVars } from "../../config/index.js";
import { UserModel } from "./model/user.model.js";

const connectDB = async () => {
  try {
    await mongoose.connect(envVars.dbUrl);
    await UserModel.syncIndexes();
    console.log("DB connected successfully 🟢");
  } catch (error) {
    console.error("DB Error ❌: ", error.message);
  }
};

export default connectDB;
