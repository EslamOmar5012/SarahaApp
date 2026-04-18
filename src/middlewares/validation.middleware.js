import { validationError } from "../common/index.js";

const validation = (validationSchema) => {
  return (req, res, next) => {
    const validationResult = validationSchema.validate(req.body, {
      abortEarly: false,
    });

    console.log(validationResult);

    if (validationResult?.error?.details.length > 0) {
      validationError(validationResult.error, validationResult.error);
    }

    next();
  };
};

export default validation;
