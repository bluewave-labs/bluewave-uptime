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
 * Get a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const getMonitorById = async (req, res) => {
  try {
    const { monitorId } = req.params;
    let { status, limit, sortOrder, filter, numToDisplay, normalize } =
      req.query;

    const filterLookup = {
      day: new Date(new Date().setDate(new Date().getDate() - 1)),
      week: new Date(new Date().setDate(new Date().getDate() - 7)),
      month: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    };

    // This effectively removes limit, returning all checks
    if (limit === undefined) limit = 0;

    // Default sort order is newest -> oldest
    if (sortOrder === "asc") {
      sortOrder = 1;
    } else if (sortOrder === "desc") {
      sortOrder = -1;
    } else sortOrder = -1;

    const monitor = await Monitor.findById(monitorId);

    const checksQuery = { monitorId: monitor._id };

    if (status !== undefined) {
      checksQuery.status = status;
    }

    // Filter checks by "day", "week", or "month"
    if (filter !== undefined) {
      checksQuery.createdAt = { $gte: filterLookup[filter] };
    }

    // Determine model type
    let model =
      monitor.type === "http" || monitor.type === "ping"
        ? Check
        : PageSpeedCheck;

    let checks = await model
      .find(checksQuery)
      .sort({
        createdAt: sortOrder,
      })
      .limit(limit);

    // If more than numToDisplay checks, pick every nth check
    if (numToDisplay !== undefined && checks && checks.length > numToDisplay) {
      const n = Math.ceil(checks.length / numToDisplay);
      checks = checks.filter((_, index) => index % n === 0);
    }

    // Normalize checks if requested
    if (normalize) {
      checks = NormalizeData(checks, 10, 100);
    }

    const notifications = await Notification.find({ monitorId: monitor._id });
    const monitorWithChecks = { ...monitor.toObject(), checks, notifications };
    return monitorWithChecks;
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
        if (normalize === true) {
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
  getMonitorById,
  getMonitorsByUserId,
  createMonitor,
  deleteMonitor,
  deleteAllMonitors,
  deleteMonitorsByUserId,
  editMonitor,
};
