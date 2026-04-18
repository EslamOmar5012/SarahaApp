import ApiError from "../utils/ApiError.utils.js";

const validationError = (errorMessage, errorData) => {
  throw new ApiError(errorMessage, 400, errorData);
};

export default validationError;
