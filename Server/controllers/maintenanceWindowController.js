const {
  createMaintenanceWindowParamValidation,
  createMaintenanceWindowBodyValidation,
  getMaintenanceWindowsByUserIdParamValidation,
  getMaintenanceWindowsByMonitorIdParamValidation,
} = require("../validation/joi");

const SERVICE_NAME = "maintenanceWindowController";
const { errorMessages, successMessages } = require("../utils/messages");

const createMaintenanceWindow = async (req, res, next) => {
  try {
    await createMaintenanceWindowParamValidation.validateAsync(req.params);
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
    const data = {
      monitorId: req.params.monitorId,
      ...req.body,
    };

    if (data.oneTime === true) {
      data.expiry = data.end;
    }

    const maintenanceWindow = await req.db.createMaintenanceWindow(data);

    return res.status(201).json({
      success: true,
      msg: successMessages.MAINTENANCE_WINDOW_CREATE,
      data: maintenanceWindow,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
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
      msg: successMessages.MAINTEANCE_WINDOW_GET_BY_USER,
      data: maintenanceWindows,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
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
      msg: successMessages.MAINTEANCE_WINDOW_GET_BY_USER,
      data: maintenanceWindows,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};
module.exports = {
  createMaintenanceWindow,
  getMaintenanceWindowsByUserId,
  getMaintenanceWindowsByMonitorId,
};
