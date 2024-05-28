const express = require("express");
const {} = require("../validation/joi");
const logger = require("../utils/logger");
require("dotenv").config();
const { createAlertParamValidation } = require("../validation/joi");

const SERVICE_NAME = "alerts";

const createAlert = async (req, res, next) => {
  try {
    await createAlertParamValidation.validateAsync(req.params);
    res
      .status(200)
      .json({ success: true, msg: "Create Alert", data: req.params.monitorId });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};
const getAlertsByUserId = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Get Alerts By UserID",
    data: req.params.userId,
  });
};
const getAlertsByMonitorId = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get Alerts By MonitorID" });
};
const getAlertById = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get Alert By alertID" });
};
const editAlert = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Edit alert" });
};
const deleteAlert = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Delete alert" });
};

module.exports = {
  createAlert,
  getAlertsByUserId,
  getAlertsByMonitorId,
  getAlertById,
  editAlert,
  deleteAlert,
};
