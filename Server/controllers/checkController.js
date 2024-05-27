var jwt = require("jsonwebtoken");
const SERVICE_NAME = "check";

const createCheck = (req, res, next) => {
  try {
    req.db.createCheck(req, res);
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

const getChecks = (req, res, next) => {
  try {
    req.db.getChecks(req, res);
    // Return all checks for a monitor
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

const deleteChecks = (req, res, next) => {
  try {
    req.db.deleteChecks(req, res);
    // Delete all checks for a monitor
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

module.exports = {
  createCheck,
  getChecks,
  deleteChecks,
};
