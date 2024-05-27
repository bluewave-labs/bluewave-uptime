const logger = require("../utils/logger");

const handleErrors = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const service = error.errorService || "Unknown service";

  logger.error(error.message, { service: service });
  res.status(status).json({ success: false, msg: message });
};

module.exports = { handleErrors };
