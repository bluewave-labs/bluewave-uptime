const logger = require("../utils/logger");
const { errorMessages } = require("../utils/messages");

const handleErrors = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || errorMessages.FRIENDLY_ERROR;
  const service = error.service || errorMessages.UNKNOWN_SERVICE;
  logger.error(error.message, {
    service: service,
    methodName: error.methodName,
  });
  res.status(status).json({ success: false, msg: message });
};

module.exports = { handleErrors };
