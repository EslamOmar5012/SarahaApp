const onSuccessRespons = (res, message, code = 200, data = undefined) => {
  return res.status(code).json({ status: "success", message, data });
};

export { onSuccessRespons };
