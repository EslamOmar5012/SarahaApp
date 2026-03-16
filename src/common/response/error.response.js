import { env } from "node:process";

export const globalErrorHandler = (error, req, res, next) => {
    return res.status(error.errorCode || 500).json({
        status: "error",
        message: error.message,
        stack: env.NODE_ENV === "development" ? error.stack : undefined,          
    });
};


export const wrongRouteHandler = (req, res, next) => {
    return res.status(404).json({
        status: "error",
        message: "Route not found"
    });
};