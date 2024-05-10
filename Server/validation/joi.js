const joi = require("joi");

const authValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const getMonitorsByIdValidation = joi.object({
  monitorId: joi.string().required(),
});

module.exports = { authValidation, getMonitorsByIdValidation };
