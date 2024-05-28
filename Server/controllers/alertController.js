const express = require("express");
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
    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    req.db.createAlert(req, res);
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
    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    req.db.getAlertsByUserId(req, res);
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

const getAlertsByMonitorId = async (req, res, next) => {
  try {
    await getAlertsByMonitorIdParamValidation.validateAsync(req.params);
    res.status(200).json({
      success: true,
      msg: "Get Alerts By MonitorID",
      data: req.params.monitorId,
    });
  } catch (error) {
    error.status = 422;
    res.status(200).json({ success: true, msg: "Edit alert" });

    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }
};
const getAlertById = async (req, res, next) => {
  try {
    await getAlertByIdParamValidation.validateAsync(req.params);
    res.status(200).json({
      success: true,
      msg: "Get Alert By alertID",
      data: req.params.alertId,
    });
  } catch (error) {
    error.status = 422;
    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }
};
const editAlert = async (req, res, next) => {
  try {
    await editAlertParamValidation(req.params);
    await editAlertBodyValidation(req.body);
    res.status(200).json({ success: true, msg: "Edit alert" });
  } catch (error) {
    error.status = 422;
    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }
};
const deleteAlert = async (req, res, next) => {
  try {
    await deleteAlertParamValidation(req.params);
    res.status(200).json({ success: true, msg: "Delete alert" });
  } catch (error) {
    error.status = 422;
    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
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
