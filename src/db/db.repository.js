//create functions
export const create = async ({ model, data = [], options = {} }) => {
  const result = await model.create(data, options);

  return result;
};

//read functions

export const countDocuments = async ({ model }) => {
  const count = await model.find().count();
  return count;
};

export const findOne = async ({ model, filter = {}, select = "" }) => {
  const result = await model.findOne(filter).select(select);

  return result;
};

export const findById = async ({ model, id = "", select = "" }) => {
  const result = await model.findById(id).select(select);

  return result;
};

export const findMany = async ({ model, filter = {}, options = undefined }) => {
  const result = await model
    .find(filter)
    .select(options.select || "")
    .sort(options.sort || {});

  return result;
};

export const paginate = async ({ model, filter = {}, page = 1, limit = 5 }) => {
  const totalDocs = await countDocuments({ model });
  const result = await model
    .find(filter)
    .skip(limit * (page - 1))
    .limit(limit);

  return {
    totalDocs,
    totalpages: Math.ceil(totalDocs / limit),
    result,
    limit,
    page,
  };
};

//update options
export const updateOne = async ({
  model,
  filter = {},
  data = {},
  options = undefined,
}) => {
  const result = await model.updateOne(filter, data, {
    runValidators: true,
    ...options,
  });

  return result;
};

export const updateMany = async ({
  model,
  filter = {},
  data = {},
  options = {},
}) => {
  const result = await model.updateMany(filter, data, {
    runValidators: true,
    ...options,
  });

  return result;
};

export const findOneAndUpdate = async ({
  model,
  filter = {},
  data = {},
  options = undefined,
}) => {
  const result = await model.findOneAndUpdate(filter, data, {
    new: true,
    upsert: true,
    runValidators: true,
    ...options,
  });

  return result;
};

//delete function
export const deleteOne = async ({ model, filter = {} }) => {
  const result = await model.deleteOne(filter);
  return result;
};

export const deleteMany = async ({ model, filter = {} }) => {
  const result = await model.deleteMany(filter);
  return result;
};

export const findOneAndDelete = async ({ model, filter = {} }) => {
  const result = await model.findOneAndDelete(filter);
  return result;
};
