const {
  getMonitorsByIdValidation,
  getMonitorsByUserIdValidation,
} = require("../validation/joi");
const logger = require("../utils/logger");

/**
 * Returns all monitors
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const getAllMonitors = async (req, res) => {
  try {
    const monitors = await req.db.getAllMonitors();
    return res.json({ success: true, msg: "Monitors found", data: monitors });
  } catch (error) {
    logger.error(error.message, { service: "monitor" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

/**
 * Returns monitor with matching ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const getMonitorById = async (req, res) => {
  const { error } = getMonitorsByIdValidation.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  }

  try {
    const monitorId = req.params.monitorId;
    const monitor = await req.db.getMonitorById(monitorId);
    return res.json({ success: true, msg: "Monitor found", data: monitor });
  } catch (error) {
    logger.error(error.message, { service: "monitor" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

/**
 * Returns all monitors belong to User with UserID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const getMonitorsByUserId = async (req, res) => {
  const { error } = getMonitorsByUserIdValidation.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  }

  try {
    const userId = req.params.userId;
    const monitors = await req.db.getMonitorsByUserId(userId);
    logger.info(`Monitors for user ${userId} found`, {
      service: "monitor",
      userId: userId,
    });
    return res.json({
      success: true,
      msg: `Monitors for user ${userId} found`,
      data: monitors,
    });
  } catch (error) {
    logger.error(error.message, { service: "monitor" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { getAllMonitors, getMonitorById, getMonitorsByUserId };
