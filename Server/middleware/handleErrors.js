const logger = require("../utils/logger");

const handleErrors = (error, req, res, next) => {
  error.status = error.status ? error.status : 500;
  logger.error(error.message, { service: error.service });
  res.status(error.status).json({ success: false, msg: error.message });
};

module.exports = { handleErrors };
