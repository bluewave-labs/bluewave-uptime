const joi = require("joi");
const { normalize } = require("path");

//****************************************
// Custom Validators
//****************************************

const roleValidatior = (role) => (value, helpers) => {
  const hasRole = role.some((role) => value.includes(role));
  if (!hasRole) {
    throw new Joi.ValidationError(
      `You do not have the required authorization. Required roles: ${roles.join(", ")}`
    );
  }
  return value;
};

//****************************************
// Auth
//****************************************

const loginValidation = joi.object({
  email: joi
    .string()
    .email()
    .required()
    .custom((value, helpers) => {
      const lowercasedValue = value.toLowerCase();
      if (value !== lowercasedValue) {
        return helpers.message("Email must be in lowercase");
      }
      return lowercasedValue;
    }),
  password: joi
    .string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]+$/
    ),
});

const registrationBodyValidation = joi.object({
  firstName: joi
    .string()
    .required()
    .pattern(/^[A-Za-z]+$/),
  lastName: joi
    .string()
    .required()
    .pattern(/^[A-Za-z]+$/),
  email: joi
    .string()
    .email()
    .required()
    .custom((value, helpers) => {
      const lowercasedValue = value.toLowerCase();
      if (value !== lowercasedValue) {
        return helpers.message("Email must be in lowercase");
      }
      return lowercasedValue;
    }),
  password: joi
    .string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]+$/
    ),
  profileImage: joi.any(),
  role: joi
    .array()
    .items(joi.string().valid("superadmin", "admin", "user", "demo"))
    .min(1)
    .required(),
  teamId: joi.string().allow("").required(),
});

const editUserParamValidation = joi.object({
  userId: joi.string().required(),
});

const editUserBodyValidation = joi.object({
  firstName: joi.string().pattern(/^[A-Za-z]+$/),
  lastName: joi.string().pattern(/^[A-Za-z]+$/),
  profileImage: joi.any(),
  newPassword: joi
    .string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]+$/
    ),
  password: joi
    .string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]+$/
    ),
  deleteProfileImage: joi.boolean(),
  role: joi.array(),
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
  password: joi
    .string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]+$/
    ),
  confirm: joi.string(),
});

const deleteUserParamValidation = joi.object({
  email: joi.string().email().required(),
});

const inviteRoleValidation = joi.object({
  roles: joi.custom(roleValidatior(["admin", "superadmin"])).required(),
});

const inviteBodyValidation = joi.object({
  email: joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Must be a valid email address",
  }),
  role: joi.array().required(),
  teamId: joi.string().required(),
});

const inviteVerifciationBodyValidation = joi.object({
  token: joi.string().required(),
});

//****************************************
// Monitors
//****************************************

const getMonitorByIdParamValidation = joi.object({
  monitorId: joi.string().required(),
});

const getMonitorByIdQueryValidation = joi.object({
  status: joi.boolean(),
  sortOrder: joi.string().valid("asc", "desc"),
  limit: joi.number(),
  dateRange: joi.string().valid("day", "week", "month"),
  numToDisplay: joi.number(),
  normalize: joi.boolean(),
});

const getMonitorsAndSummaryByTeamIdParamValidation = joi.object({
  teamId: joi.string().required(),
});

const getMonitorsAndSummaryByTeamIdQueryValidation = joi.object({
  type: joi
    .alternatives()
    .try(
      joi.string().valid("http", "ping", "pagespeed"),
      joi.array().items(joi.string().valid("http", "ping", "pagespeed"))
    ),
});

const getMonitorsByTeamIdValidation = joi.object({
  teamId: joi.string().required(),
});

const getMonitorsByTeamIdQueryValidation = joi.object({
  status: joi.boolean(),
  checkOrder: joi.string().valid("asc", "desc"),
  limit: joi.number(),
  normalize: joi.boolean(),
  type: joi
    .alternatives()
    .try(
      joi.string().valid("http", "ping", "pagespeed"),
      joi.array().items(joi.string().valid("http", "ping", "pagespeed"))
    ),
  page: joi.number(),
  rowsPerPage: joi.number(),
  filter: joi.string(),
  field: joi.string(),
  order: joi.string().valid("asc", "desc"),
});

const getMonitorStatsByIdParamValidation = joi.object({
  monitorId: joi.string().required(),
});
const getMonitorStatsByIdQueryValidation = joi.object({
  status: joi.string(),
  limit: joi.number(),
  sortOrder: joi.string().valid("asc", "desc"),
  dateRange: joi.string().valid("day", "week", "month"),
  numToDisplay: joi.number(),
  normalize: joi.boolean(),
});

const getCertificateParamValidation = joi.object({
  monitorId: joi.string().required(),
});

const createMonitorBodyValidation = joi.object({
  _id: joi.string(),
  userId: joi.string().required(),
  teamId: joi.string().required(),
  name: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().required(),
  url: joi.string().required(),
  isActive: joi.boolean(),
  interval: joi.number(),
  notifications: joi.array().items(joi.object()),
});

const editMonitorBodyValidation = joi.object({
  name: joi.string(),
  description: joi.string(),
  interval: joi.number(),
  notifications: joi.array().items(joi.object()),
});

const pauseMonitorParamValidation = joi.object({
  monitorId: joi.string().required(),
});

const getMonitorAggregateStatsParamValidation = joi.object({
  monitorId: joi.string().required(),
});
const getMonitorAggregateStatsQueryValidation = joi.object({
  dateRange: joi.string().valid("day", "week", "month"),
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

const getChecksQueryValidation = joi.object({
  sortOrder: joi.string().valid("asc", "desc"),
  limit: joi.number(),
  dateRange: joi.string().valid("day", "week", "month"),
  filter: joi.string().valid("all", "down", "resolve"),
  page: joi.number(),
  rowsPerPage: joi.number(),
});

const getTeamChecksParamValidation = joi.object({
  teamId: joi.string().required(),
});

const getTeamChecksQueryValidation = joi.object({
  sortOrder: joi.string().valid("asc", "desc"),
  limit: joi.number(),
  dateRange: joi.string().valid("day", "week", "month"),
  filter: joi.string().valid("all", "down", "resolve"),
  page: joi.number(),
  rowsPerPage: joi.number(),
});

const deleteChecksParamValidation = joi.object({
  monitorId: joi.string().required(),
});

const deleteChecksByTeamIdParamValidation = joi.object({
  teamId: joi.string().required(),
});

const updateChecksTTLBodyValidation = joi.object({
  ttl: joi.number().required(),
});

//****************************************
// PageSpeedCheckValidation
//****************************************

const getPageSpeedCheckParamValidation = joi.object({
  monitorId: joi.string().required(),
});

//Validation schema for the monitorId parameter
const createPageSpeedCheckParamValidation = joi.object({
  monitorId: joi.string().required(),
});

//Validation schema for the monitorId body
const createPageSpeedCheckBodyValidation = joi.object({
  url: joi.string().required(),
});

const deletePageSpeedCheckParamValidation = joi.object({
  monitorId: joi.string().required(),
});

//****************************************
// MaintenanceWindowValidation
//****************************************
const createMaintenanceWindowParamValidation = joi.object({
  monitorId: joi.string().required(),
});

const createMaintenanceWindowBodyValidation = joi.object({
  userId: joi.string().required(),
  active: joi.boolean().required(),
  oneTime: joi.boolean().required(),
  start: joi.date().required(),
  end: joi.date().required(),
  expiry: joi.date(),
});

const getMaintenanceWindowsByUserIdParamValidation = joi.object({
  userId: joi.string().required(),
});

const getMaintenanceWindowsByMonitorIdParamValidation = joi.object({
  monitorId: joi.string().required(),
});

module.exports = {
  roleValidatior,
  loginValidation,
  registrationBodyValidation,
  recoveryValidation,
  recoveryTokenValidation,
  newPasswordValidation,
  inviteRoleValidation,
  inviteBodyValidation,
  inviteVerifciationBodyValidation,
  createMonitorBodyValidation,
  getMonitorByIdParamValidation,
  getMonitorByIdQueryValidation,
  getMonitorsAndSummaryByTeamIdParamValidation,
  getMonitorsAndSummaryByTeamIdQueryValidation,
  getMonitorsByTeamIdValidation,
  getMonitorsByTeamIdQueryValidation,
  getMonitorStatsByIdParamValidation,
  getMonitorStatsByIdQueryValidation,
  getCertificateParamValidation,
  getMonitorAggregateStatsParamValidation,
  getMonitorAggregateStatsQueryValidation,
  editMonitorBodyValidation,
  pauseMonitorParamValidation,
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
  getChecksQueryValidation,
  getTeamChecksParamValidation,
  getTeamChecksQueryValidation,
  deleteChecksParamValidation,
  deleteChecksByTeamIdParamValidation,
  updateChecksTTLBodyValidation,
  deleteUserParamValidation,
  getPageSpeedCheckParamValidation,
  createPageSpeedCheckParamValidation,
  deletePageSpeedCheckParamValidation,
  createPageSpeedCheckBodyValidation,
  createMaintenanceWindowParamValidation,
  createMaintenanceWindowBodyValidation,
  getMaintenanceWindowsByUserIdParamValidation,
  getMaintenanceWindowsByMonitorIdParamValidation,
};
