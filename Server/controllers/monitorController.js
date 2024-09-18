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
  getMonitorAggregateStatsParamValidation,
  getMonitorAggregateStatsQueryValidation,
} = require("../validation/joi");

const sslChecker = require("ssl-checker");
const SERVICE_NAME = "monitorController";
const { errorMessages, successMessages } = require("../utils/messages");
const jwt = require("jsonwebtoken");
const { getTokenFromHeaders } = require("../utils/utils");

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
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "getAllMonitors") : null;
    next(error);
  }
};

/**
 * Returns agregate stats for a monitor
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */

const getMonitorAggregateStats = async (req, res, next) => {
  try {
    await getMonitorAggregateStatsParamValidation.validateAsync(req.params);
    await getMonitorAggregateStatsQueryValidation.validateAsync(req.query);
  } catch (error) {
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const { monitorId } = req.params;
    const dateRange = req.query.dateRange;
    const aggregateStats = await req.db.getMonitorAggregateStats(
      monitorId,
      dateRange
    );
    return res.json({
      success: true,
      msg: successMessages.MONTIOR_STATS_BY_ID,
      data: aggregateStats,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "getMonitorAggregateStats")
      : null;
    next(error);
  }
};

/**
 * Returns monitor stats for monitor with matching ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const getMonitorStatsById = async (req, res, next) => {
  try {
    await getMonitorStatsByIdParamValidation.validateAsync(req.params);
    await getMonitorStatsByIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const monitorStats = await req.db.getMonitorStatsById(req);
    return res.json({
      success: true,
      msg: successMessages.MONTIOR_STATS_BY_ID,
      data: monitorStats,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "getMonitorStatsById") : null;
    next(error);
  }
};

const getMonitorCertificate = async (req, res, next) => {
  try {
    await getCertificateParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
  }

  try {
    const { monitorId } = req.params;
    const monitor = await req.db.getMonitorById(monitorId);
    const monitorUrl = new URL(monitor.url);
    const certificate = await sslChecker(monitorUrl.hostname);
    if (certificate && certificate.validTo) {
      return res.json({
        success: true,
        msg: successMessages.MONITOR_CERTIFICATE,
        data: {
          certificateDate: new Date(certificate.validTo).toLocaleDateString(),
        },
      });
    } else {
      return res.json({
        success: true,
        msg: successMessages.MONITOR_CERTIFICATE,
        data: { certificateDate: "N/A" },
      });
    }
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "getMonitorCertificate")
      : null;
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
    const monitor = await req.db.getMonitorById(req.params.monitorId);
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
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "getMonitorById") : null;
    next(error);
  }
};

/**
 * Returns all monitors and a sumamry for a team with TeamID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */

const getMonitorsAndSummaryByTeamId = async (req, res, next) => {
  try {
    await getMonitorsAndSummaryByTeamIdParamValidation.validateAsync(
      req.params
    );
    await getMonitorsAndSummaryByTeamIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.method === undefined &&
      error.method === "getMonitorsAndSummaryByTeamId";
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const { teamId } = req.params;
    const { type, search, field, order } = req.query;
    const monitorsSummary = await req.db.getMonitorsAndSummaryByTeamId(
      teamId,
      type,
      search,
      field,
      order
    );
    return res.status(200).json({
      success: true,
      msg: successMessages.MONITOR_GET_BY_USER_ID(teamId),
      data: monitorsSummary,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "getMonitorsAndSummaryByTeamId")
      : null;
    next(error);
  }
};

/**
 * Returns all monitors belong to team with TeamID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 * @throws {Error}
 */
const getMonitorsByTeamId = async (req, res, next) => {
  try {
    await getMonitorsByTeamIdValidation.validateAsync(req.params);
    await getMonitorsByTeamIdQueryValidation.validateAsync(req.query);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const teamId = req.params.teamId;
    const monitors = await req.db.getMonitorsByTeamId(req, res);
    return res.json({
      success: true,
      msg: successMessages.MONITOR_GET_BY_USER_ID(teamId),
      data: monitors,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "getMonitorsByTeamId") : null;
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
      const setNotifications = await Promise.all(
        notifications.map(async (notification) => {
          notification.monitorId = monitor._id;
          await req.db.createNotification(notification);
        })
      );
      monitor.notifications = setNotifications;
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
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "createMonitor") : null;
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
    await req.db.deletePageSpeedChecksByMonitorId(monitor._id);
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
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "deleteMonitor") : null;
    next(error);
  }
};

const deleteAllMonitors = async (req, res) => {
  try {
    const token = getTokenFromHeaders(req.headers);
    const { teamId } = jwt.verify(token, process.env.JWT_SECRET);
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
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "deleteAllMonitors") : null;
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
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "editMonitor") : null;
    next(error);
  }
};

const pauseMonitor = async (req, res, next) => {
  try {
    await pauseMonitorParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
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
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "pauseMonitor") : null;
    next(error);
  }
};

const addDemoMonitors = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req.headers);
    const { _id, teamId } = jwt.verify(token, process.env.JWT_SECRET);
    const demoMonitors = await req.db.addDemoMonitors(_id, teamId);
    await demoMonitors.forEach(async (monitor) => {
      await req.jobQueue.addJob(monitor._id, monitor);
    });
    return res.status(200).json({
      success: true,
      message: successMessages.MONITOR_DEMO_ADDED,
      data: demoMonitors.length,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "addDemoMonitors") : null;
    next(error);
  }
};

module.exports = {
  getAllMonitors,
  getMonitorAggregateStats,
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
