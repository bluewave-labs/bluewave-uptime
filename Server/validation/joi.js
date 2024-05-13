const joi = require("joi");
const user = require("../models/user");

const authValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const getMonitorsByIdValidation = joi.object({
  monitorId: joi.string().required(),
});

const getMonitorsByUserIdValidation = joi.object({
  userId: joi.string().required(),
});

module.exports = {
  authValidation,
  getMonitorsByIdValidation,
  getMonitorsByUserIdValidation,
};
