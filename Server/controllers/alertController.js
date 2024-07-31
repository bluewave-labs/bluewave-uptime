const logger = require("../utils/logger");
require("dotenv").config();
const {
  createAlertParamValidation,
  createAlertBodyValidation,
  getAlertsByUserIdParamValidation,
  getAlertsByMonitorIdParamValidation,
  getAlertByIdParamValidation,
  editAlertParamValidation,
  editAlertBodyValidation,
  deleteAlertParamValidation,
} = require("../validation/joi");
const { successMessages } = require("../utils/messages");
const SERVICE_NAME = "alerts";

/**
 * Creates an alert for a monitor
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const createAlert = async (req, res, next) => {
  try {
    await createAlertParamValidation.validateAsync(req.params);
    await createAlertBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const alertData = { ...req.body };
    const alert = await req.db.createAlert(alertData);
    return res
      .status(200)
      .json({ success: true, msg: successMessages.ALERT_CREATE, data: alert });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

/**
 * Gets all alerts for a user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const getAlertsByUserId = async (req, res, next) => {
  try {
    await getAlertsByUserIdParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const alerts = await req.db.getAlertsByUserId(req.params.userId);
    return res.status(200).json({
      success: true,
      msg: successMessages.ALERT_GET_BY_USER,
      data: alerts,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

const getAlertsByMonitorId = async (req, res, next) => {
  try {
    await getAlertsByMonitorIdParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const alerts = await req.db.getAlertsByMonitorId(req.params.monitorId);
    return res.status(200).json({
      success: true,
      msg: successMessages.ALERT_GET_BY_MONITOR,
      data: alerts,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

const getAlertById = async (req, res, next) => {
  try {
    await getAlertByIdParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const alert = await req.db.getAlertById(req.params.alertId);
    return res.status(200).json({
      success: true,
      msg: successMessages.ALERT_GET_BY_ID,
      data: alert,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

const editAlert = async (req, res, next) => {
  try {
    await editAlertParamValidation.validateAsync(req.params);
    await editAlertBodyValidation.validateAsync(req.body);
  } catch (error) {
    console.log(error);
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const alertData = { ...req.body };
    const alert = await req.db.editAlert(req.params.alertId, alertData);
    return res.status(200).json({
      success: true,
      msg: successMessages.ALERT_EDIT,
      data: alert,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};
const deleteAlert = async (req, res, next) => {
  try {
    await deleteAlertParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const deleted = await req.db.deleteAlert(req.params.alertId);
    return res.status(200).json({
      success: true,
      msg: successMessages.ALERT_DELETE,
      data: deleted,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

module.exports = {
  createAlert,
  getAlertsByUserId,
  getAlertsByMonitorId,
  getAlertById,
  editAlert,
  deleteAlert,
};
