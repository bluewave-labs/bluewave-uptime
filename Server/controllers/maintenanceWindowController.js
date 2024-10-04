const {
  createMaintenanceWindowBodyValidation,
  getMaintenanceWindowsByUserIdParamValidation,
  getMaintenanceWindowsByMonitorIdParamValidation,
} = require("../validation/joi");

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
    const monitorIds = req.body.monitors;
    const dbTransactions = monitorIds.map((monitorId) => {
      return req.db.createMaintenanceWindow({
        monitorId,
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

const getMaintenanceWindowsByUserId = async (req, res, next) => {
  try {
    await getMaintenanceWindowsByUserIdParamValidation.validateAsync(
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
    const maintenanceWindows = await req.db.getMaintenanceWindowsByUserId(
      req.params.userId
    );

    return res.status(201).json({
      success: true,
      msg: successMessages.MAINTENANCE_WINDOW_GET_BY_USER,
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
module.exports = {
  createMaintenanceWindows,
  getMaintenanceWindowsByUserId,
  getMaintenanceWindowsByMonitorId,
};
