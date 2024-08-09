const Check = require("../../../models/Check");
const Monitor = require("../../../models/Monitor");
const mongoose = require("mongoose");
const dateRangeLookup = {
  day: new Date(new Date().setDate(new Date().getDate() - 1)),
  week: new Date(new Date().setDate(new Date().getDate() - 7)),
  month: new Date(new Date().setMonth(new Date().getMonth() - 1)),
};

/**
 * Create a check for a monitor
 * @async
 * @param {Object} checkData
 * @param {string} checkData.monitorId
 * @param {boolean} checkData.status
 * @param {number} checkData.responseTime
 * @param {number} checkData.statusCode
 * @param {string} checkData.message
 * @returns {Promise<Check>}
 * @throws {Error}
 */

const createCheck = async (checkData) => {
  try {
    const check = await new Check({ ...checkData }).save();
    return check;
  } catch (error) {
    throw error;
  }
};

const getChecksCount = async (req) => {
  const monitorId = req.params.monitorId;
  const dateRange = req.query.dateRange;
  const filter = req.query.filter;
  console.log(filter);
  // Build query
  const checksQuery = { monitorId: monitorId };
  // Filter checks by "day", "week", or "month"
  if (dateRange !== undefined) {
    checksQuery.createdAt = { $gte: dateRangeLookup[dateRange] };
  }

  if (filter !== undefined) {
    checksQuery.status = false;
    switch (filter) {
      case "all":
        break;
      case "down":
        break;
      case "resolve":
        checksQuery.statusCode = 5000;
        break;
      default:
        console.log("default");
        break;
    }
  }

  const count = await Check.countDocuments(checksQuery);
  return count;
};

/**
 * Get all checks for a monitor
 * @async
 * @param {string} monitorId
 * @returns {Promise<Array<Check>>}
 * @throws {Error}
 */

const getChecks = async (req) => {
  try {
    const { monitorId } = req.params;
    let { sortOrder, limit, dateRange, filter, page, rowsPerPage } = req.query;
    // Default limit to 0 if not provided
    limit = limit === "undefined" ? 0 : limit;

    // Default sort order is newest -> oldest
    sortOrder = sortOrder === "asc" ? 1 : -1;

    // Build query
    const checksQuery = { monitorId: monitorId };
    // Filter checks by "day", "week", or "month"
    if (dateRange !== undefined) {
      checksQuery.createdAt = { $gte: dateRangeLookup[dateRange] };
    }
    // Fitler checks by status
    if (filter !== undefined) {
      checksQuery.status = false;
      switch (filter) {
        case "all":
          break;
        case "down":
          break;
        case "resolve":
          checksQuery.statusCode = 5000;
          break;
        default:
          console.log("default");
          break;
      }
    }

    // Need to skip and limit here
    let skip = 0;
    if (page && rowsPerPage) {
      skip = page * rowsPerPage;
    }
    const checks = await Check.find(checksQuery)
      .skip(skip)
      .limit(rowsPerPage)
      .sort({ createdAt: sortOrder });
    return checks;
  } catch (error) {
    throw error;
  }
};

const getUserChecks = async (req) => {
  const { userId } = req.params;
  let { sortOrder, limit, dateRange, filter, page, rowsPerPage } = req.query;

  // Get monitorIDs
  const userMonitors = await Monitor.find({ userId: userId });
  const monitorIds = userMonitors.map((monitor) => monitor._id);

  //Build check query
  // Default limit to 0 if not provided
  limit = limit === "undefined" ? 0 : limit;

  // Default sort order is newest -> oldest
  sortOrder = sortOrder === "asc" ? 1 : -1;

  checksQuery = { monitorId: { $in: monitorIds } };

  if (filter !== undefined) {
    checksQuery.status = false;
    switch (filter) {
      case "all":
        break;
      case "down":
        break;
      case "resolve":
        checksQuery.statusCode = 5000;
        break;
      default:
        console.log("default");
        break;
    }
  }

  if (dateRange !== undefined) {
    checksQuery.createdAt = { $gte: dateRangeLookup[dateRange] };
  }

  // Skip and limit for pagination
  let skip = 0;
  if (page && rowsPerPage) {
    skip = page * rowsPerPage;
  }

  const checksCount = await Check.countDocuments(checksQuery);

  const checks = await Check.find(checksQuery)
    .skip(skip)
    .limit(rowsPerPage)
    .sort({ createdAt: sortOrder });

  return { checksCount, checks };
};

/**
 * Delete all checks for a user
 * @async
 * @param {string} monitorId
 * @returns {number}
 * @throws {Error}
 */

const deleteChecks = async (monitorId) => {
  try {
    const result = await Check.deleteMany({ monitorId });
    return result.deletedCount;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createCheck,
  getChecksCount,
  getChecks,
  getUserChecks,
  deleteChecks,
};
