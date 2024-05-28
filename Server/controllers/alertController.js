const express = require("express");
const {} = require("../validation/joi");
const logger = require("../utils/logger");
require("dotenv").config();

const SERVICE_NAME = "alerts";

const createAlert = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create Alert" });
};
const getAlertsByUserId = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get Alerts By UserID" });
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
