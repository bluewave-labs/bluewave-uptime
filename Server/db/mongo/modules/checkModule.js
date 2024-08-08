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
  const filter = req.query.filter;
  // Build query
  const checksQuery = { monitorId: monitorId };
  // Filter checks by "day", "week", or "month"
  if (filter !== undefined) {
    checksQuery.createdAt = { $gte: dateRangeLookup[filter] };
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
    console.log(filter);
    // Default limit to 0 if not provided
    if (limit === undefined) limit = 0;

    // Default sort order is newest -> oldest
    if (sortOrder === "asc") {
      sortOrder = 1;
    } else if (sortOrder === "desc") {
      sortOrder = -1;
    } else sortOrder = -1;

    // Build query
    const checksQuery = { monitorId: monitorId };
    // Filter checks by "day", "week", or "month"
    if (dateRange !== undefined) {
      checksQuery.createdAt = { $gte: dateRangeLookup[dateRange] };
    }
    // Fitler checks by status
    if (filter !== undefined) {
      checksQuery.status = false;
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

/**
 * Delete all checks for a monitor
 * @async
 * @param {string} monitorId
 * @returns {number}
 * @throws {Error}
 */

const getUserChecks = async (req) => {
  const { userId } = req.params;
  try {
    const objectId = mongoose.Types.ObjectId.createFromHexString(userId);

    const checks = await Check.aggregate([
      {
        $lookup: {
          from: "monitors", // The name of the Monitor collection
          localField: "monitorId",
          foreignField: "_id",
          as: "monitorDetails",
        },
      },
      {
        $unwind: "$monitorDetails",
      },
      {
        $match: {
          "monitorDetails.userId": objectId,
        },
      },
    ]);
    return checks;
  } catch (error) {
    throw error;
  }
};

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
