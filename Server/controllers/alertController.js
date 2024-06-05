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
const { get } = require("mongoose");

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
    const alertData = { ...req.body };
    const alert = await req.db.createAlert(alertData);
    return res
      .status(200)
      .json({ success: true, msg: "Alert created", data: alert });
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
    const alerts = await req.db.getAlertsByUserId(req.params.userId);
    return res
      .status(200)
      .json({ success: true, msg: "Got alerts", data: alerts });
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
    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const alerts = await req.db.getAlertsByMonitorId(req.params.monitorId);
    return res.status(200).json({
      success: true,
      msg: "Got alerts by Monitor",
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
    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const alert = await req.db.getAlertById(req.params.alertId);
    return res.status(200).json({
      success: true,
      msg: "Got Alert By alertID",
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
    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const alertData = { ...req.body };
    const alert = await req.db.editAlert(req.params.alertId, alertData);
    return res.status(200).json({
      success: true,
      msg: "Edited alert",
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
    error.message = error.details[0].message;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const deleted = await req.db.deleteAlert(req.params.alertId);
    return res.status(200).json({
      success: true,
      msg: "Deleted alert",
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
