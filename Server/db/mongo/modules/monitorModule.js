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
    const monitors = await Monitor.find();
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

  for (let i = checks.length; i <= 0; i--) {
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
 * Helper function to get average response time
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */
const getAverageResponseTime = (checks) => {
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
 * Get stats by monitor ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const getMonitorStatsById = async (req) => {
  const startDates = {
    day: new Date(new Date().setDate(new Date().getDate() - 1)),
    week: new Date(new Date().setDate(new Date().getDate() - 7)),
    month: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  };
  const endDate = new Date();
  try {
    // Get monitor
    const { monitorId } = req.params;
    let { limit, sortOrder, dateRange, numToDisplay, normalize } = req.query;
    const monitor = await Monitor.findById(monitorId);
    if (monitor === null || monitor === undefined) {
      throw new Error(errorMessages.DB_FIND_MONTIOR_BY_ID(monitorId));
    }
    // This effectively removes limit, returning all checks
    if (limit === undefined) limit = 0;
    // Default sort order is newest -> oldest
    sortOrder = sortOrder === "asc" ? 1 : -1;

    let model =
      monitor.type === "http" || monitor.type === "ping"
        ? Check
        : PageSpeedCheck;

    const monitorStats = {
      ...monitor.toObject(),
    };

    // Build checks query
    const checksQuery = { monitorId: monitor._id };

    // Get all checks
    const checksAll = await model.find(checksQuery).sort({
      createdAt: sortOrder,
    });

    const checksQueryForDateRange = {
      ...checksQuery,
      createdAt: {
        $gte: startDates[dateRange],
        $lte: endDate,
      },
    };

    const checksForDateRange = await model
      .find(checksQueryForDateRange)
      .sort({ createdAt: sortOrder });

    if (monitor.type === "http" || monitor.type === "ping") {
      // HTTP/PING Specific stats
      monitorStats.periodAvgResponseTime =
        getAverageResponseTime(checksForDateRange);
      monitorStats.periodUptime = getUptimePercentage(checksForDateRange);

      // Aggregate data
      let groupedChecks;
      // Group checks by hour if range is day
      if (dateRange === "day") {
        groupedChecks = checksForDateRange.reduce((acc, check) => {
          const time = new Date(check.createdAt);
          time.setMinutes(0, 0, 0);
          if (!acc[time]) {
            acc[time] = { time, checks: [] };
          }
          acc[time].checks.push(check);
          return acc;
        }, {});
      } else {
        groupedChecks = checksForDateRange.reduce((acc, check) => {
          const time = new Date(check.createdAt).toISOString().split("T")[0]; // Extract the date part
          if (!acc[time]) {
            acc[time] = { time, checks: [] };
          }
          acc[time].checks.push(check);
          return acc;
        }, {});
      }

      // Map grouped checks to stats
      const aggregateData = Object.values(groupedChecks).map((group) => {
        const totalChecks = group.checks.length;
        const uptimePercentage = getUptimePercentage(group.checks);
        const totalIncidents = group.checks.filter(
          (check) => check.status === false
        ).length;
        const avgResponseTime =
          group.checks.reduce((sum, check) => sum + check.responseTime, 0) /
          totalChecks;

        return {
          time: group.time,
          uptimePercentage,
          totalChecks,
          totalIncidents,
          avgResponseTime,
        };
      });
      monitorStats.aggregateData = aggregateData;
    }

    monitorStats.periodIncidents = getIncidents(checksForDateRange);
    monitorStats.periodTotalChecks = checksForDateRange.length;

    // If more than numToDisplay checks, pick every nth check

    let nthChecks = checksForDateRange;

    if (
      numToDisplay !== undefined &&
      checksForDateRange &&
      checksForDateRange.length > numToDisplay
    ) {
      const n = Math.ceil(checksForDateRange.length / numToDisplay);
      nthChecks = checksForDateRange.filter((_, index) => index % n === 0);
    }

    // Normalize checks if requested
    if (normalize !== undefined) {
      const normailzedChecks = NormalizeData(nthChecks, 1, 100);
      monitorStats.checks = normailzedChecks;
    } else {
      monitorStats.checks = nthChecks;
    }

    monitorStats.uptimeDuration = calculateUptimeDuration(checksAll);
    monitorStats.lastChecked = getLastChecked(checksAll);
    monitorStats.latestResponseTime = getLatestResponseTime(checksAll);

    return monitorStats;
  } catch (error) {
    error.methodName = "getMonitorStatsById";
    throw error;
  }
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
    if (monitor === null || monitor === undefined) {
      throw new Error(errorMessages.DB_FIND_MONTIOR_BY_ID(monitorId));
    }
    // Get notifications
    const notifications = await Notification.find({
      monitorId: monitorId,
    });
    monitor.notifications = notifications;
    const monitorWithNotifications = await monitor.save();
    return monitorWithNotifications;
  } catch (error) {
    throw error;
  }
};

/**
 * Get monitors by TeamID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Array<Monitor>>}
 * @throws {Error}
 */
const getMonitorsByTeamId = async (req, res) => {
  try {
    let { limit, type, status, sortOrder, normalize, page, rowsPerPage } =
      req.query || {};
    const monitorQuery = { teamId: req.params.teamId };
    const monitorsCount = await Monitor.countDocuments({
      teamId: req.params.teamId,
      type,
    });

    // Pagination
    let skip = 0;
    if (page && rowsPerPage) {
      skip = page * rowsPerPage;
    }

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

    const monitors = await Monitor.find(monitorQuery)
      .skip(skip)
      .limit(rowsPerPage);
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
        return { ...monitor.toObject(), checks };
      })
    );
    return { monitors: monitorsWithChecks, monitorCount: monitorsCount };
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
const editMonitor = async (candidateId, candidateMonitor) => {
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
  getMonitorsByTeamId,
  createMonitor,
  deleteMonitor,
  deleteAllMonitors,
  deleteMonitorsByUserId,
  editMonitor,
};
