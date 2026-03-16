import express from "express";
import morgan from "morgan";
import {envVars} from "../config/index.js";
import {connectDB} from "./db/index.js";
import {globalErrorHandler, wrongRouteHandler } from "./common/index.js";
import { userRouter } from "./module/index.js";

export default async function bootstrap(){
    //make app entry point for express server
    const app = express();

    //connect DB
    await connectDB();

    //global middlewares
        //parse body params to request
        app.use(express.json());
        //morgan for API logging in development mode
        if(envVars.nodeEnv === "development")
            app.use(morgan("combined"));

    
    //user module
    app.use('/user', userRouter);

    //wrong route error handler
    app.use("{/*dummy}", wrongRouteHandler);

    //global error handler
    app.use(globalErrorHandler);

    //start express server
    app.listen(envVars.port, envVars.localHost, (error) => {
        if(error)
            return console.log("Server error ❌: ", error.message);
        console.log(`Server is running on port ${envVars.port} 🟢`);
    });
}