const joi = require("joi");
const user = require("../models/user");

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});
const registerValidation = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
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
  loginValidation,
  registerValidation,
  getMonitorsByIdValidation,
  getMonitorsByUserIdValidation,
};
