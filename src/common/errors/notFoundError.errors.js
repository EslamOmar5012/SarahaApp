import ApiError from "../utils/ApiError.utils.js";

const notFoundError = (message) => {
  throw new ApiError(message, 404);
};

export default notFoundError;
