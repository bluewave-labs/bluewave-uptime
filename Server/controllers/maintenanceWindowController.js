const {
  createMaintenanceWindowBodyValidation,
  getMaintenanceWindowsByMonitorIdParamValidation,
  getMaintenanceWindowsByTeamIdQueryValidation,
  deleteMaintenanceWindowByIdParamValidation,
} = require("../validation/joi");
const jwt = require("jsonwebtoken");
const { getTokenFromHeaders } = require("../utils/utils");
const { successMessages } = require("../utils/messages");
const SERVICE_NAME = "maintenanceWindowController";

const createMaintenanceWindows = async (req, res, next) => {
  try {
    await createMaintenanceWindowBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }
  try {
    const token = getTokenFromHeaders(req.headers);
    const { jwtSecret } = req.settingsService.getSettings();
    const { teamId } = jwt.verify(token, jwtSecret);
    const monitorIds = req.body.monitors;
    const dbTransactions = monitorIds.map((monitorId) => {
      return req.db.createMaintenanceWindow({
        teamId,
        monitorId,
        name: req.body.name,
        active: req.body.active ? req.body.active : true,
        repeat: req.body.repeat,
        start: req.body.start,
        end: req.body.end,
      });
    });
    await Promise.all(dbTransactions);
    return res.status(201).json({
      success: true,
      msg: successMessages.MAINTENANCE_WINDOW_CREATE,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "createMaintenanceWindow")
      : null;
    next(error);
  }
};

const getMaintenanceWindowsByTeamId = async (req, res, next) => {
  try {
    await getMaintenanceWindowsByTeamIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const token = getTokenFromHeaders(req.headers);
    const { jwtSecret } = req.settingsService.getSettings();
    const { teamId } = jwt.verify(token, jwtSecret);
    const maintenanceWindows = await req.db.getMaintenanceWindowsByTeamId(
      teamId,
      req.query
    );

    return res.status(201).json({
      success: true,
      msg: successMessages.MAINTENANCE_WINDOW_GET_BY_TEAM,
      data: maintenanceWindows,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "getMaintenanceWindowsByUserId")
      : null;
    next(error);
  }
};

const getMaintenanceWindowsByMonitorId = async (req, res, next) => {
  try {
    await getMaintenanceWindowsByMonitorIdParamValidation.validateAsync(
      req.params
    );
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const maintenanceWindows = await req.db.getMaintenanceWindowsByMonitorId(
      req.params.monitorId
    );

    return res.status(201).json({
      success: true,
      msg: successMessages.MAINTENANCE_WINDOW_GET_BY_USER,
      data: maintenanceWindows,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "getMaintenanceWindowsByMonitorId")
      : null;
    next(error);
  }
};

const deleteMaintenanceWindow = async (req, res, next) => {
  try {
    await deleteMaintenanceWindowByIdParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }
  try {
    await req.db.deleteMaintenanceWindowById(req.params.id);
    return res.status(201).json({
      success: true,
      msg: successMessages.MAINTENANCE_WINDOW_DELETE,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "deleteMaintenanceWindow")
      : null;
  }
};

const editMaintenanceWindow = async (req, res, next) => {
  try {
    await editMaintenanceWindowByIdParamValidation.validateAsync(req.params);
    await editMaintenanceByIdWindowBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }
  try {
    await req.db.editMaintenanceWindow(req.params.id, req.body);
    return res.status(201).json({
      success: true,
      msg: successMessages.MAINTENANCE_WINDOW_EDIT,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "editMaintenanceWindow")
      : null;
  }
};

module.exports = {
  createMaintenanceWindows,
  getMaintenanceWindowsByTeamId,
  getMaintenanceWindowsByMonitorId,
  deleteMaintenanceWindow,
  editMaintenanceWindow,
};
