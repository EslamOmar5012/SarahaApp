export const successResponse = ({
  response,
  data = undefined,
  code = 200,
  message = undefined,
}) => {
  return response.status(code).json({ state: "success", message, data });
};
