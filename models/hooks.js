export const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  errorstatus = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

export const runValidatorsAtUpdate = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};
