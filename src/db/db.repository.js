//Creat methods
export const create = async ({ model, data = [], options }) => {
  const result = await model.create(data, options);

  return result;
};

//read methods

export const find = async ({ model, filter, options }) => {
  const result = await model
    .find(filter)
    .skip(options?.skip || 0)
    .limit(options?.limit || 0)
    .sort(options?.sort || "");

  return result;
};

export const findOne = async ({ model, filter, select = "" }) => {
  const result = await model.findOne(filter).select(select);

  return result;
};

export const findById = async ({ model, id, select = "" }) => {
  const result = await model.findById(id).select(select);

  return result;
};
