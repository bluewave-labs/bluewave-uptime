const {
  getMonitorByIdValidation,
  getMonitorsByUserIdValidation,
  monitorValidation,
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
  const { error } = getMonitorByIdValidation.validate(req.params);
  if (error) {
    return res
      .status(422)
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
      .status(422)
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

/**
 * Creates a new monitor
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */

const createMonitor = async (req, res) => {
  const { error } = monitorValidation.validate(req.body);
  if (error) {
    return res
      .status(422)
      .json({ success: false, msg: error.details[0].message });
  }

  try {
    const monitor = await req.db.createMonitor(req, res);
    return res
      .status(201)
      .json({ success: true, msg: "Monitor created", data: monitor });
  } catch (error) {
    logger.error(error.message, { service: "monitor" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

/**
 * Delete a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */

const deleteMonitor = async (req, res) => {
  const { error } = getMonitorByIdValidation.validate(req.params);
  if (error) {
    return res
      .status(422)
      .json({ success: false, msg: error.details[0].message });
  }
  try {
    const monitor = await req.db.deleteMonitor(req, res);
    /**
     * TODO
     * We should remove all checks and alerts associated with this monitor
     * when it is deleted so there is no orphaned data
     * We also need to make sure to stop all running services for this monitor
     */
    return res.status(204).json({ success: true, msg: "Monitor deleted" });
  } catch (error) {
    logger.error(error.message, { service: "monitor" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

/**
 * Edit a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const editMonitor = async (req, res) => {
  let paramError = getMonitorByIdValidation.validate(req.params);
  if (paramError.error) {
    return res
      .status(422)
      .json({ success: false, msg: paramError.error.details[0].message });
  }

  let { error } = monitorValidation.validate(req.body);
  if (error) {
    return res
      .status(422)
      .json({ success: false, msg: error.details[0].message });
  }

  try {
    const editedMonitor = await req.db.editMonitor(req, res);
    return res
      .status(200)
      .json({ success: true, msg: "Monitor edited", data: editedMonitor });
  } catch (error) {
    logger.error(error.message, { service: "monitor" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllMonitors,
  getMonitorById,
  getMonitorsByUserId,
  createMonitor,
  deleteMonitor,
  editMonitor,
};
