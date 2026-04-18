import { env } from "process";

const notFoundResponse = (res, message) => {
  return res.status(404).json({ status: "error", message });
};

const globalErrorResponse = (error, res) => {
  return res.status(error.code || 500).json({
    status: "error",
    message: error.message,
    data: error.data,
    stack: env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export { notFoundResponse, globalErrorResponse };
