const PageSpeedCheck = require("../models/PageSpeedCheck");
const { successMessages } = require("../utils/messages");
const SERVICE_NAME = "pagespeed";

const getPageSpeedChecks = async (req, res, next) => {
  try {
    return res.status(200).json({ msg: "Hit getPageSpeedChecks" });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

const createPageSpeedCheck = async (req, res, next) => {
  try {
    return res.status(200).json({ msg: "Hit createPageSpeedCheck" });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

const deletePageSpeedCheck = async (req, res, next) => {
  try {
    return res.status(200).json({ msg: "Hit deletePageSpeedCheck" });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

module.exports = {
  getPageSpeedChecks,
  createPageSpeedCheck,
  deletePageSpeedCheck,
};
