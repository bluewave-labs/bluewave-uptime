const handleValidationError = (error, serviceName) => {
  error.status = 422;
  error.service = serviceName;
  error.message =
    error.details?.[0]?.message || error.message || "Validation Error";
  return error;
};

const handleError = (error, serviceName, method, code = 500) => {
  error.code === undefined ? (error.code = code) : null;
  error.service === undefined ? (error.service = serviceName) : null;
  error.method === undefined ? (error.method = method) : null;
  return error;
};

module.exports = {
  handleValidationError,
  handleError,
};
