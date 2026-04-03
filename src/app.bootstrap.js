import express from "express";
import { connectDB } from "./db/index.js";
import { envVars } from "../config/index.js";
import { env } from "node:process";
import {
  globalErrorResponse,
  notFoundResponse,
  onSuccessRespons,
} from "./common/index.js";
import { authRouter } from "./modules/index.js";
import morgan from "morgan";

export default async function bootstrap() {
  const app = express();

  await connectDB();

  app.use(express.json());

  if (env.NODE_ENV === "development") app.use(morgan("combined"));

  app.get("/test", (req, res, next) => {
    onSuccessRespons(res, "Server is running");
  });

  app.use("/auth", authRouter);

  app.use("{/*dummy}", (req, res, next) => {
    notFoundResponse(res, "Route not found");
  });

  app.use((err, req, res, next) => {
    return globalErrorResponse(err, res);
  });

  app.listen(envVars.port, envVars.host, (error) => {
    if (error) return console.error("Server error ❌ : ", error.message);

    console.log("Server is Running 🟢");
  });
}
