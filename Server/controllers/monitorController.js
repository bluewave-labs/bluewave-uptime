const {
  getMonitorByIdValidation,
  getMonitorsByUserIdValidation,
  monitorValidation,
} = require("../validation/joi");

const SERVICE_NAME = "monitorController";

/**
 * Returns all monitors
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const getAllMonitors = async (req, res, next) => {
  try {
    const monitors = await req.db.getAllMonitors();
    return res.json({ success: true, msg: "Monitors found", data: monitors });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
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
const getMonitorById = async (req, res, next) => {
  try {
    await getMonitorByIdValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.message = error.details[0].message;
    next(error);
    return;
  }

  try {
    const monitor = await req.db.getMonitorById(req, res);
    if (!monitor) {
      const error = new Error("Monitor not found");
      error.status = 404;
      throw error;
    }

    return res.json({ success: true, msg: "Monitor found", data: monitor });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
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
const getMonitorsByUserId = async (req, res, next) => {
  const { error } = getMonitorsByUserIdValidation.validate(req.params);
  if (error) {
    return res
      .status(422)
      .json({ success: false, msg: error.details[0].message });
  }

  try {
    const userId = req.params.userId;
    const monitors = await req.db.getMonitorsByUserId(req, res);

    if (monitors && monitors.length === 0) {
      const err = new Error("No monitors found");
      err.status = 404;
      throw err;
    }

    return res.json({
      success: true,
      msg: `Monitors for user ${userId} found`,
      data: monitors,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
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

const createMonitor = async (req, res, next) => {
  try {
    await monitorValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message = error.details[0].message;
    next(error);
    return;
  }

  try {
    const monitor = await req.db.createMonitor(req, res);

    return res
      .status(201)
      .json({ success: true, msg: "Monitor created", data: monitor });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
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

const deleteMonitor = async (req, res, next) => {
  try {
    await getMonitorByIdValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message = error.details[0].message;
    next(error);
    return;
  }

  try {
    const monitor = await req.db.deleteMonitor(req, res, next);
    /**
     * TODO
     * We should remove all checks and alerts associated with this monitor
     * when it is deleted so there is no orphaned data
     * We also need to make sure to stop all running services for this monitor
     */
    return res.status(200).json({ success: true, msg: "Monitor deleted" });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
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
const editMonitor = async (req, res, next) => {
  try {
    await getMonitorByIdValidation.validateAsync(req.params);
    await monitorValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message = error.details[0].message;
    next(error);
    return;
  }

  try {
    const editedMonitor = await req.db.editMonitor(req, res);
    return res
      .status(200)
      .json({ success: true, msg: "Monitor edited", data: editedMonitor });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
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
