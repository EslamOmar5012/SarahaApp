const onSuccessRespons = (res, message, code = 200) => {
  return res.status(code).json({ status: "success", message });
};

export { onSuccessRespons };
