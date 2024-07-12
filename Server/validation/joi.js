const joi = require("joi");

//****************************************
// Auth
//****************************************

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const registerValidation = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  profileImage: joi.any(),
  role: joi.string().required(),
});

const editUserParamValidation = joi.object({
  userId: joi.string().required(),
});

const editUserBodyValidation = joi.object({
  firstname: joi.string(),
  lastname: joi.string(),
  profileImage: joi.any(),
  newPassword: joi.string().min(8),
  password: joi.string().min(8),
  deleteProfileImage: joi.boolean(),
  role: joi.string(),
});

const recoveryValidation = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
});

const recoveryTokenValidation = joi.object({
  recoveryToken: joi.string().required(),
});

const newPasswordValidation = joi.object({
  recoveryToken: joi.string().required(),
  password: joi.string().min(8).required(),
  confirm: joi.string(),
});

const deleteUserParamValidation = joi.object({
  email: joi.string().email().required(),
});

//****************************************
// Monitors
//****************************************

const getMonitorByIdValidation = joi.object({
  monitorId: joi.string().required(),
});

const getMonitorsByUserIdValidation = joi.object({
  userId: joi.string().required(),
});

const monitorValidation = joi.object({
  _id: joi.string(),
  userId: joi.string().required(),
  name: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().required(),
  url: joi.string().required(),
  isActive: joi.boolean(),
  interval: joi.number(),
});

//****************************************
// Alerts
//****************************************

const createAlertParamValidation = joi.object({
  monitorId: joi.string().required(),
});

const createAlertBodyValidation = joi.object({
  checkId: joi.string().required(),
  monitorId: joi.string().required(),
  userId: joi.string().required(),
  status: joi.boolean(),
  message: joi.string(),
  notifiedStatus: joi.boolean(),
  acknowledgeStatus: joi.boolean(),
});

const getAlertsByUserIdParamValidation = joi.object({
  userId: joi.string().required(),
});

const getAlertsByMonitorIdParamValidation = joi.object({
  monitorId: joi.string().required(),
});

const getAlertByIdParamValidation = joi.object({
  alertId: joi.string().required(),
});

const editAlertParamValidation = joi.object({
  alertId: joi.string().required(),
});

const editAlertBodyValidation = joi.object({
  status: joi.boolean(),
  message: joi.string(),
  notifiedStatus: joi.boolean(),
  acknowledgeStatus: joi.boolean(),
});

const deleteAlertParamValidation = joi.object({
  alertId: joi.string().required(),
});

//****************************************
// Checks
//****************************************

const createCheckParamValidation = joi.object({
  monitorId: joi.string().required(),
});

const createCheckBodyValidation = joi.object({
  monitorId: joi.string().required(),
  status: joi.boolean().required(),
  responseTime: joi.number().required(),
  statusCode: joi.number().required(),
  message: joi.string().required(),
});

const getChecksParamValidation = joi.object({
  monitorId: joi.string().required(),
});

const deleteChecksParamValidation = joi.object({
  monitorId: joi.string().required(),
});

module.exports = {
  loginValidation,
  registerValidation,
  recoveryValidation,
  recoveryTokenValidation,
  newPasswordValidation,
  getMonitorByIdValidation,
  getMonitorsByUserIdValidation,
  monitorValidation,
  editUserParamValidation,
  editUserBodyValidation,
  createAlertParamValidation,
  createAlertBodyValidation,
  getAlertsByUserIdParamValidation,
  getAlertsByMonitorIdParamValidation,
  getAlertByIdParamValidation,
  editAlertParamValidation,
  editAlertBodyValidation,
  deleteAlertParamValidation,
  createCheckParamValidation,
  createCheckBodyValidation,
  getChecksParamValidation,
  deleteChecksParamValidation,
  deleteUserParamValidation,
};
