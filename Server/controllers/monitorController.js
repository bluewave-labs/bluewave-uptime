const {
  getMonitorByIdParamValidation,
  getMonitorByIdQueryValidation,
  getMonitorsByTeamIdValidation,
  createMonitorBodyValidation,
  editMonitorBodyValidation,
  getMonitorsAndSummaryByTeamIdParamValidation,
  getMonitorsAndSummaryByTeamIdQueryValidation,
  getMonitorsByTeamIdQueryValidation,
  pauseMonitorParamValidation,
  getMonitorStatsByIdParamValidation,
  getMonitorStatsByIdQueryValidation,
  getCertificateParamValidation,
} = require("../validation/joi");

const sslChecker = require("ssl-checker");
const SERVICE_NAME = "monitorController";
const { errorMessages, successMessages } = require("../utils/messages");
const jwt = require("jsonwebtoken");
const { getTokenFromHeaders } = require("../utils/utils");
const logger = require("../utils/logger");
const { handleError, handleValidationError } = require("./controllerUtils");

/**
 * Returns all monitors
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {function} next
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const getAllMonitors = async (req, res, next) => {
  try {
    const monitors = await req.db.getAllMonitors();
    return res.status(200).json({
      success: true,
      msg: successMessages.MONITOR_GET_ALL,
      data: monitors,
    });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "getAllMonitors"));
  }
};

/**
 * Returns monitor stats for monitor with matching ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {function} next
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const getMonitorStatsById = async (req, res, next) => {
  try {
    await getMonitorStatsByIdParamValidation.validateAsync(req.params);
    await getMonitorStatsByIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
    return;
  }

  try {
    const monitorStats = await req.db.getMonitorStatsById(req);
    return res.status(200).json({
      success: true,
      msg: successMessages.MONITOR_STATS_BY_ID,
      data: monitorStats,
    });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "getMonitorStatsById"));
  }
};

const getMonitorCertificate = async (req, res, next) => {
  try {
    await getCertificateParamValidation.validateAsync(req.params);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
  }

  try {
    const { monitorId } = req.params;
    const monitor = await req.db.getMonitorById(monitorId);
    const monitorUrl = new URL(monitor.url);
    const certificate = await sslChecker(monitorUrl.hostname);
    if (certificate && certificate.validTo) {
      return res.status(200).json({
        success: true,
        msg: successMessages.MONITOR_CERTIFICATE,
        data: {
          certificateDate: new Date(certificate.validTo).toLocaleDateString(),
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: successMessages.MONITOR_CERTIFICATE,
        data: { certificateDate: "N/A" },
      });
    }
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "getMonitorCertificate"));
  }
};

/**
 * Retrieves a monitor by its ID.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.params - The parameters of the request.
 * @property {string} req.params.monitorId - The ID of the monitor to be retrieved.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The response object with a success status, a message, and the retrieved monitor data.
 * @throws {Error} If there is an error during the process, especially if the monitor is not found (404) or if there is a validation error (422).
 */
const getMonitorById = async (req, res, next) => {
  try {
    await getMonitorByIdParamValidation.validateAsync(req.params);
    await getMonitorByIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
    return;
  }

  try {
    const monitor = await req.db.getMonitorById(req.params.monitorId);
    if (!monitor) {
      const error = new Error(errorMessages.MONITOR_GET_BY_ID);
      error.status = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      msg: successMessages.MONITOR_GET_BY_ID,
      data: monitor,
    });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "getMonitorById"));
  }
};

/**
 * Retrieves all monitors and a summary for a team based on the team ID.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.params - The parameters of the request.
 * @property {string} req.params.teamId - The ID of the team.
 * @property {Object} req.query - The query parameters of the request.
 * @property {string} req.query.type - The type of the request.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The response object with a success status, a message, and the data containing the monitors and summary for the team.
 * @throws {Error} If there is an error during the process, especially if there is a validation error (422).
 */
const getMonitorsAndSummaryByTeamId = async (req, res, next) => {
  try {
    await getMonitorsAndSummaryByTeamIdParamValidation.validateAsync(
      req.params
    );
    await getMonitorsAndSummaryByTeamIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
    return;
  }

  try {
    const { teamId } = req.params;
    const { type } = req.query;
    const monitorsSummary = await req.db.getMonitorsAndSummaryByTeamId(
      teamId,
      type
    );
    return res.status(200).json({
      success: true,
      msg: successMessages.MONITOR_GET_BY_USER_ID(teamId),
      data: monitorsSummary,
    });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "getMonitorsAndSummaryByTeamId"));
  }
};

/**
 * Retrieves all monitors associated with a team by the team's ID.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.params - The parameters of the request.
 * @property {string} req.params.teamId - The ID of the team.
 * @property {Object} req.query - The query parameters of the request.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The response object with a success status, a message, and the data containing the monitors for the team.
 * @throws {Error} If there is an error during the process, especially if there is a validation error (422).
 */
const getMonitorsByTeamId = async (req, res, next) => {
  try {
    await getMonitorsByTeamIdValidation.validateAsync(req.params);
    await getMonitorsByTeamIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
    return;
  }

  try {
    const teamId = req.params.teamId;
    const monitors = await req.db.getMonitorsByTeamId(req, res);
    return res.status(200).json({
      success: true,
      msg: successMessages.MONITOR_GET_BY_USER_ID(teamId),
      data: monitors,
    });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "getMonitorsByTeamId"));
    next(error);
  }
};

/**
 * Creates a new monitor and adds it to the job queue.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.body - The body of the request.
 * @property {Array} req.body.notifications - The notifications associated with the monitor.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The response object with a success status, a message indicating the creation of the monitor, and the created monitor data.
 * @throws {Error} If there is an error during the process, especially if there is a validation error (422).
 */
const createMonitor = async (req, res, next) => {
  try {
    await createMonitorBodyValidation.validateAsync(req.body);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
    return;
  }

  try {
    const notifications = req.body.notifications;
    const monitor = await req.db.createMonitor(req, res);

    if (notifications && notifications.length !== 0) {
      monitor.notifications = await Promise.all(
        notifications.map(async (notification) => {
          notification.monitorId = monitor._id;
          await req.db.createNotification(notification);
        })
      );
      await monitor.save();
    }
    // Add monitor to job queue
    req.jobQueue.addJob(monitor._id, monitor);
    return res.status(201).json({
      success: true,
      msg: successMessages.MONITOR_CREATE,
      data: monitor,
    });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "createMonitor"));
  }
};

/**
 * Deletes a monitor by its ID and also deletes associated checks, alerts, and notifications.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.params - The parameters of the request.
 * @property {string} req.params.monitorId - The ID of the monitor to be deleted.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The response object with a success status and a message indicating the deletion of the monitor.
 * @throws {Error} If there is an error during the process, especially if there is a validation error (422) or an error in deleting associated records.
 */
const deleteMonitor = async (req, res, next) => {
  try {
    await getMonitorByIdParamValidation.validateAsync(req.params);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
    return;
  }

  try {
    const monitor = await req.db.deleteMonitor(req, res, next);
    // Delete associated checks,alerts,and notifications
    try {
      await req.jobQueue.deleteJob(monitor);
      await req.db.deleteChecks(monitor._id);
      await req.db.deletePageSpeedChecksByMonitorId(monitor._id);
      await req.db.deleteNotificationsByMonitorId(monitor._id);
    } catch (error) {
      logger.error(
        `Error deleting associated records for monitor ${monitor._id} with name ${monitor.name}`,
        {
          method: "deleteMonitor",
          service: SERVICE_NAME,
          error: error.message,
        }
      );
    }
    return res
      .status(200)
      .json({ success: true, msg: successMessages.MONITOR_DELETE });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "deleteMonitor"));
  }
};

/**
 * Deletes all monitors associated with a team.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.headers - The headers of the request.
 * @property {string} req.headers.authorization - The authorization header containing the JWT token.
 * @param {Object} res - The Express response object.
 * @param {function} next
 * @returns {Object} The response object with a success status and a message indicating the number of deleted monitors.
 * @throws {Error} If there is an error during the deletion process.
 */
const deleteAllMonitors = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req.headers);
    const { jwtSecret } = req.settingsService.getSettings();
    const { teamId } = jwt.verify(token, jwtSecret);
    const { monitors, deletedCount } = await req.db.deleteAllMonitors(teamId);
    await monitors.forEach(async (monitor) => {
      await req.jobQueue.deleteJob(monitor);
      await req.db.deleteChecks(monitor._id);
      await req.db.deleteAlertByMonitorId(monitor._id);
      await req.db.deletePageSpeedChecksByMonitorId(monitor._id);
      await req.db.deleteNotificationsByMonitorId(monitor._id);
    });

    return res
      .status(200)
      .json({ success: true, msg: `Deleted ${deletedCount} monitors` });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "deleteAllMonitors"));
  }
};

/**
 * Edits a monitor by its ID, updates its notifications, and updates its job in the job queue.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.params - The parameters of the request.
 * @property {string} req.params.monitorId - The ID of the monitor to be edited.
 * @property {Object} req.body - The body of the request.
 * @property {Array} req.body.notifications - The notifications to be associated with the monitor.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The response object with a success status, a message indicating the editing of the monitor, and the edited monitor data.
 * @throws {Error} If there is an error during the process, especially if there is a validation error (422).
 */
const editMonitor = async (req, res, next) => {
  try {
    await getMonitorByIdParamValidation.validateAsync(req.params);
    await editMonitorBodyValidation.validateAsync(req.body);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
    return;
  }

  try {
    const { monitorId } = req.params;
    const monitorBeforeEdit = await req.db.getMonitorById(monitorId);

    // Get notifications from the request body
    const notifications = req.body.notifications;

    const editedMonitor = await req.db.editMonitor(monitorId, req.body);

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
    next(handleError(error, SERVICE_NAME, "editMonitor"));
  }
};

/**
 * Pauses or resumes a monitor based on its current state.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.params - The parameters of the request.
 * @property {string} req.params.monitorId - The ID of the monitor to be paused or resumed.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The response object with a success status, a message indicating the new state of the monitor, and the updated monitor data.
 * @throws {Error} If there is an error during the process.
 */
const pauseMonitor = async (req, res, next) => {
  try {
    await pauseMonitorParamValidation.validateAsync(req.params);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
  }

  try {
    const monitor = await req.db.getMonitorById(req.params.monitorId);
    if (monitor.isActive) {
      await req.jobQueue.deleteJob(monitor);
    } else {
      await req.jobQueue.addJob(monitor._id, monitor);
    }
    monitor.isActive = !monitor.isActive;
    monitor.status = undefined;
    monitor.save();
    return res.status(200).json({
      success: true,
      msg: monitor.isActive
        ? successMessages.MONITOR_RESUME
        : successMessages.MONITOR_PAUSE,
      data: monitor,
    });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "pauseMonitor"));
  }
};

/**
 * Adds demo monitors for a team.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.headers - The headers of the request.
 * @property {string} req.headers.authorization - The authorization header containing the JWT token.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The response object with a success status, a message indicating the addition of demo monitors, and the number of demo monitors added.
 * @throws {Error} If there is an error during the process.
 */
const addDemoMonitors = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req.headers);
    const { jwtSecret } = req.settingsService.getSettings();
    const { _id, teamId } = jwt.verify(token, jwtSecret);
    const demoMonitors = await req.db.addDemoMonitors(_id, teamId);
    await Promise.all(
      demoMonitors.map((monitor) => req.jobQueue.addJob(monitor._id, monitor))
    );

    return res.status(200).json({
      success: true,
      message: successMessages.MONITOR_DEMO_ADDED,
      data: demoMonitors.length,
    });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "addDemoMonitors"));
  }
};

module.exports = {
  getAllMonitors,
  getMonitorStatsById,
  getMonitorCertificate,
  getMonitorById,
  getMonitorsAndSummaryByTeamId,
  getMonitorsByTeamId,
  createMonitor,
  deleteMonitor,
  deleteAllMonitors,
  editMonitor,
  pauseMonitor,
  addDemoMonitors,
};
