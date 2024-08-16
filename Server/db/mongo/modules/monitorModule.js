const Monitor = require("../../../models/Monitor");
const Check = require("../../../models/Check");
const PageSpeedCheck = require("../../../models/PageSpeedCheck");
const { errorMessages } = require("../../../utils/messages");
const Notification = require("../../../models/Notification");
const { NormalizeData } = require("../../../utils/dataUtils");

/**
 * Get all monitors
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Array<Monitor>>}
 * @throws {Error}
 */
const getAllMonitors = async (req, res) => {
  try {
    const monitors = await Monitor.find({ isActive: true });
    return monitors;
  } catch (error) {
    throw error;
  }
};

/**
 * Function to calculate uptime duration based on the most recent check.
 * @param {Array} checks Array of check objects.
 * @returns {number} Uptime duration in ms.
 */
const calculateUptimeDuration = (checks) => {
  if (!checks || checks.length === 0) {
    return 0;
  }

  const latestCheck = new Date(checks[0].createdAt);
  let latestDownCheck = 0;

  for (let i = 0; i < checks.length; i++) {
    if (checks[i].status === false) {
      latestDownCheck = new Date(checks[i].createdAt);
      break;
    }
  }

  // If no down check is found, uptime is from the last check to now
  if (latestDownCheck === 0) {
    return Date.now() - new Date(checks[checks.length - 1].createdAt);
  }

  // Otherwise the uptime is from the last check to the last down check
  return latestCheck - latestDownCheck;
};

/**
 * Helper function to get duration since last check
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */
const getLastChecked = (checks) => {
  if (!checks || checks.length === 0) {
    return 0; // Handle case when no checks are available
  }
  // Data is sorted newest->oldest, so last check is the most recent
  return new Date() - new Date(checks[0].createdAt);
};

/**
 * Helper function to get latestResponseTime
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */
const getLatestResponseTime = (checks) => {
  if (!checks || checks.length === 0) {
    return 0;
  }
  return checks[0].responseTime;
};

/**
 * Helper function to get average 24h response time
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */
const getAverageResponseTime24Hours = (checks) => {
  if (!checks || checks.length === 0) {
    return 0;
  }
  const aggResponseTime = checks.reduce((sum, check) => {
    return sum + check.responseTime;
  }, 0);
  return aggResponseTime / checks.length;
};

/**
 * Helper function to get precentage 24h uptime
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */

const getUptimePercentage = (checks) => {
  if (!checks || checks.length === 0) {
    return 0;
  }
  const upCount = checks.reduce((count, check) => {
    return check.status === true ? count + 1 : count;
  }, 0);
  return (upCount / checks.length) * 100;
};

/**
 * Helper function to get all incidents
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */

const getIncidents = (checks) => {
  if (!checks || checks.length === 0) {
    return 0; // Handle case when no checks are available
  }
  return checks.reduce((acc, check) => {
    return check.status === false ? (acc += 1) : acc;
  }, 0);
};
/**
 * Helper function to get all incidents
 * @param {Array} checks Array of check objects.
 * @returns {Array<Boolean>}  Array of booleans representing up/down.
 */
const getStatusBarValues = (monitor, checks) => {
  const checksIn60Mins = Math.floor((60 * 60 * 1000) / monitor.interval);
  const noBlankChecks = checksIn60Mins - checks.length;

  let statusBarValues = checks.map((check) => {
    return {
      status: check.status,
      createdAt: check.createdAt,
      responseTime: check.responseTime,
    };
  });

  statusBarValues = NormalizeData(statusBarValues, 33, 100);

  // statusBarValues = NormalizeData(statusBarValues, 1, 100);

  for (let i = 0; i < noBlankChecks; i++) {
    statusBarValues.push({
      status: undefined,
      responseTime: 10,
      value: 75,
    });
  }
  return statusBarValues;
};
/**
 * Get stats by monitor ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const getMonitorStatsById = async (req) => {
  const filterLookup = {
    hour: new Date(new Date().getTime() - 60 * 60 * 1000),
    day: new Date(new Date().setDate(new Date().getDate() - 1)),
    week: new Date(new Date().setDate(new Date().getDate() - 7)),
    month: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  };

  try {
    const { monitorId } = req.params;
    let { status, limit, sortOrder, dateRange, numToDisplay, normalize } =
      req.query;

    // This effectively removes limit, returning all checks
    if (limit === undefined) limit = 0;

    // Default sort order is newest -> oldest
    sortOrder = sortOrder === "asc" ? 1 : -1;

    // Get monitor
    const monitor = await Monitor.findById(monitorId);

    // Determine if this is a pagespeed monitor or an http/ping monitor
    let model =
      monitor.type === "http" || monitor.type === "ping"
        ? Check
        : PageSpeedCheck;

    // Build monitor stats object
    const monitorStats = {
      ...monitor.toObject(),
    };

    // Start building query
    const checksQuery = { monitorId: monitor._id };

    // Get all checks
    const checksAll = await model.find(checksQuery).sort({
      createdAt: sortOrder,
    });

    if (monitor.type === "http" || monitor.type === "ping") {
      const checksQuery24Hours = {
        ...checksQuery,
        createdAt: { $gte: filterLookup.day },
      };
      const checksQuery30Days = {
        ...checksQuery,
        createdAt: { $gte: filterLookup.month },
      };
      const checksQuery60Mins = {
        ...checksQuery,
        createdAt: { $gte: filterLookup.hour },
      };

      const [checks24Hours, checks30Days, checks60Mins] = await Promise.all([
        model.find(checksQuery24Hours).sort({ createdAt: sortOrder }),
        model.find(checksQuery30Days).sort({ createdAt: sortOrder }),
        model.find(checksQuery60Mins).sort({ createdAt: sortOrder }),
      ]);

      // HTTP/PING Specific stats
      monitorStats.avgResponseTime24hours =
        getAverageResponseTime24Hours(checks24Hours);
      monitorStats.uptime24Hours = getUptimePercentage(checks24Hours);
      monitorStats.uptime30Days = getUptimePercentage(checks30Days);
      monitorStats.statusBar = getStatusBarValues(monitor, checks60Mins);
    }

    //Get checks for dateRange
    if (status !== undefined) {
      checksQuery.status = status;
    }

    // Filter checks by "day", "week", or "month"
    if (dateRange !== undefined) {
      checksQuery.createdAt = { $gte: filterLookup[dateRange] };
    }

    let dateRangeChecks = await model
      .find(checksQuery)
      .sort({
        createdAt: sortOrder,
      })
      .limit(limit);

    const incidents = getIncidents(dateRangeChecks);

    // If more than numToDisplay checks, pick every nth check
    if (
      numToDisplay !== undefined &&
      dateRangeChecks &&
      dateRangeChecks.length > numToDisplay
    ) {
      const n = Math.ceil(dateRangeChecks.length / numToDisplay);
      dateRangeChecks = dateRangeChecks.filter((_, index) => index % n === 0);
    }

    // Normalize checks if requested
    if (normalize !== undefined) {
      dateRangeChecks = NormalizeData(dateRangeChecks, 1, 100);
    }

    // Add common stats and stats that depend on the dateRange
    monitorStats.uptimeDuration = calculateUptimeDuration(checksAll);
    monitorStats.lastChecked = getLastChecked(checksAll);
    monitorStats.latestResponseTime = getLatestResponseTime(checksAll);
    monitorStats.incidents = incidents;
    monitorStats.checks = dateRangeChecks;

    return monitorStats;
  } catch (error) {}
};

/**
 * Get a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const getMonitorById = async (monitorId) => {
  try {
    const monitor = await Monitor.findById(monitorId);
    return monitor;
  } catch (error) {
    throw error;
  }
};

/**
 * Get monitors by UserID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Array<Monitor>>}
 * @throws {Error}
 */
const getMonitorsByUserId = async (req, res) => {
  try {
    let { limit, type, status, sortOrder, normalize } = req.query;
    const monitorQuery = { userId: req.params.userId };

    if (type !== undefined) {
      const types = Array.isArray(type) ? type : [type];
      monitorQuery.type = { $in: types };
    }

    // Default sort order is newest -> oldest
    if (sortOrder === "asc") {
      sortOrder = 1;
    } else if (sortOrder === "desc") {
      sortOrder = -1;
    } else sortOrder = -1;

    // This effectively removes limit, returning all checks
    if (limit === undefined) limit = 0;

    const monitors = await Monitor.find(monitorQuery);
    // Map each monitor to include its associated checks
    const monitorsWithChecks = await Promise.all(
      monitors.map(async (monitor) => {
        const checksQuery = { monitorId: monitor._id };
        if (status !== undefined) {
          checksQuery.status = status;
        }

        let model =
          monitor.type === "http" || monitor.type === "ping"
            ? Check
            : PageSpeedCheck;

        // Checks are order newest -> oldest
        let checks = await model
          .find(checksQuery)
          .sort({
            createdAt: sortOrder,
          })
          .limit(limit);

        //Normalize checks if requested
        if (normalize !== undefined) {
          checks = NormalizeData(checks, 10, 100);
        }

        // Get notifications
        const notifications = await Notification.find({
          monitorId: monitor._id,
        });
        return { ...monitor.toObject(), checks, notifications };
      })
    );
    return monitorsWithChecks;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a monitor
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const createMonitor = async (req, res) => {
  try {
    const monitor = new Monitor({ ...req.body });
    // Remove notifications fom monitor as they aren't needed here
    monitor.notifications = undefined;
    monitor.userId = req.user._id;
    await monitor.save();
    return monitor;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const deleteMonitor = async (req, res) => {
  const monitorId = req.params.monitorId;
  try {
    const monitor = await Monitor.findByIdAndDelete(monitorId);
    if (!monitor) {
      throw new Error(errorMessages.DB_FIND_MONTIOR_BY_ID(monitorId));
    }
    return monitor;
  } catch (error) {
    throw error;
  }
};

/**
 * DELETE ALL MONITORS (TEMP)
 */

const deleteAllMonitors = async (req, res) => {
  try {
    const deletedCount = await Monitor.deleteMany({});
    return deletedCount.deletedCount;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete all monitors associated with a user ID
 * @async
 * @param {string} userId - The ID of the user whose monitors are to be deleted.
 * @returns {Promise} A promise that resolves when the operation is complete.
 */
const deleteMonitorsByUserId = async (userId) => {
  try {
    const result = await Monitor.deleteMany({ userId: userId });
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Edit a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const editMonitor = async (req, res) => {
  const candidateId = req.params.monitorId;
  const candidateMonitor = req.body;
  candidateMonitor.notifications = undefined;

  try {
    const editedMonitor = await Monitor.findByIdAndUpdate(
      candidateId,
      candidateMonitor,
      { new: true }
    );
    return editedMonitor;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMonitors,
  getMonitorStatsById,
  getMonitorById,
  getMonitorsByUserId,
  createMonitor,
  deleteMonitor,
  deleteAllMonitors,
  deleteMonitorsByUserId,
  editMonitor,
};
