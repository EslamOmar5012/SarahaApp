import ApiError from "../utils/ApiError.utils.js";

const conflictError = (message) => {
  throw new ApiError(message, 409);
};

export default conflictError;
