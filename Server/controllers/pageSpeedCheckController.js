const PageSpeedCheck = require("../models/PageSpeedCheck");
const { successMessages } = require("../utils/messages");
const SERVICE_NAME = "pagespeed";
const { pageSpeedCheckValidation } = require("../validation/joi");

/**
 * Gets all PageSpeedChecks for a monitor
 * @async
 * @param {Express.Request} req - The request object
 * @param {Express.Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<Express.Response>}
 */
const getPageSpeedChecks = async (req, res, next) => {
  try {
    // Validate monitorId parameter
    const { error } = pageSpeedCheckValidation.validateAsync(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    return res.status(200).json({ msg: "Hit getPageSpeedChecks" });
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new PageSpeedCheck for a monitor
 * @async
 * @param {Express.Request} req - The request object
 * @param {Express.Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<Express.Response>}
 */
const createPageSpeedCheck = async (req, res, next) => {
  try {
    // Validate monitorId parameter
    const { error } = pageSpeedCheckValidation.validateAsync(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    return res.status(200).json({ msg: "Hit createPageSpeedCheck" });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

/**
 * Deletes all PageSpeedChecks for a monitor
 * @async
 * @param {Express.Request} req - The request object
 * @param {Express.Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<Express.Response>}
 */
const deletePageSpeedCheck = async (req, res, next) => {
  try {
    // Validate monitorId parameter
    const { error } = pageSpeedCheckValidation.validateAsync(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

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
