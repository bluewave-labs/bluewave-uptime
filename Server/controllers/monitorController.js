const {
  getMonitorByIdParamValidation,
  getMonitorByIdQueryValidation,
  getMonitorsByUserIdValidation,
  createMonitorBodyValidation,
  editMonitorBodyValidation,
  getMonitorsByUserIdQueryValidation,
} = require("../validation/joi");

const SERVICE_NAME = "monitorController";
const { errorMessages, successMessages } = require("../utils/messages");
const { runInNewContext } = require("vm");

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
    return res.json({
      success: true,
      msg: successMessages.MONITOR_GET_ALL,
      data: monitors,
    });
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
    await getMonitorByIdParamValidation.validateAsync(req.params);
    await getMonitorByIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const monitor = await req.db.getMonitorById(req, res);
    if (!monitor) {
      const error = new Error(errorMessages.MONITOR_GET_BY_ID);
      error.status = 404;
      throw error;
    }

    return res.json({
      success: true,
      msg: successMessages.MONTIOR_GET_BY_ID,
      data: monitor,
    });
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
  try {
    await getMonitorsByUserIdValidation.validateAsync(req.params);
    await getMonitorsByUserIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const userId = req.params.userId;
    const monitors = await req.db.getMonitorsByUserId(req, res);

    return res.json({
      success: true,
      msg: successMessages.MONITOR_GET_BY_USER_ID(userId),
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
    await createMonitorBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";

    next(error);
    return;
  }

  try {
    const notifications = req.body.notifications;
    const monitor = await req.db.createMonitor(req, res);

    if (notifications && notifications.length !== 0) {
      await Promise.all(
        notifications.map(async (notification) => {
          notification.monitorId = monitor._id;
          await req.db.createNotification(notification);
        })
      );
    }
    // Add monitor to job queue
    req.jobQueue.addJob(monitor._id, monitor);
    return res.status(201).json({
      success: true,
      msg: successMessages.MONITOR_CREATE,
      data: monitor,
    });
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
    await getMonitorByIdParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const monitor = await req.db.deleteMonitor(req, res, next);
    // Delete associated checks,alerts,and notifications
    await req.jobQueue.deleteJob(monitor);
    await req.db.deleteChecks(monitor._id);
    await req.db.deleteAlertByMonitorId(monitor._id);
    await req.db.deleteNotificationsByMonitorId(monitor._id);

    /**
     * TODO
     * We should remove all checks and alerts associated with this monitor
     * when it is deleted so there is no orphaned data
     * We also need to make sure to stop all running services for this monitor
     */
    return res
      .status(200)
      .json({ success: true, msg: successMessages.MONITOR_DELETE });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

const deleteAllMonitors = async (req, res) => {
  try {
    const deleteCount = await req.db.deleteAllMonitors();
    return res
      .status(200)
      .json({ success: true, msg: `Deleted ${deleteCount} monitors` });
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
    await getMonitorByIdParamValidation.validateAsync(req.params);
    await editMonitorBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const monitorBeforeEdit = await req.db.getMonitorById(req, res);

    // Get notifications from the request body
    const notifications = req.body.notifications;

    const editedMonitor = await req.db.editMonitor(req, res);

    await req.db.deleteNotificationsByMonitorId(editedMonitor._id);

    if (notifications && notifications.length !== 0) {
      await Promise.all(
        notifications.map(async (notification) => {
          notification.monitorId = editedMonitor._id;
          await req.db.createNotification(notification);
        })
      );
    }

    // Delete the old job(editedMonitor has the same ID as the old monitor)
    await req.jobQueue.deleteJob(monitorBeforeEdit);
    // Add the new job back to the queue
    await req.jobQueue.addJob(editedMonitor._id, editedMonitor);
    return res.status(200).json({
      success: true,
      msg: successMessages.MONITOR_EDIT,
      data: editedMonitor,
    });
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
  deleteAllMonitors,
  editMonitor,
};
