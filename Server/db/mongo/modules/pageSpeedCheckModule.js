const PageSpeedCheck = require("../../../models/PageSpeedCheck");

/**
 * Create a PageSpeed check for a monitor
 * @async
 * @param {Object} pageSpeedCheckData
 * @param {string} pageSpeedCheckData.monitorId
 * @param {number} pageSpeedCheckData.accessibility
 * @param {number} pageSpeedCheckData.bestPractices
 * @param {number} pageSpeedCheckData.seo
 * @param {number} pageSpeedCheckData.performance
 * @returns {Promise<PageSpeedCheck>}
 * @throws {Error}
 */
const createPageSpeedCheck = async (pageSpeedCheckData) => {
  try {
    const pageSpeedCheck = await new PageSpeedCheck({
      ...pageSpeedCheckData,
    }).save();
    return pageSpeedCheck;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all PageSpeed checks for a monitor
 * @async
 * @param {string} monitorId
 * @returns {Promise<Array<PageSpeedCheck>>}
 * @throws {Error}
 */

const getPageSpeedChecks = async (monitorId) => {
  try {
    const pageSpeedChecks = await PageSpeedCheck.find({ monitorId });
    return pageSpeedChecks;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete all PageSpeed checks for a monitor
 * @async
 * @param {string} monitorId
 * @returns {number}
 * @throws {Error}
 */

const deletePageSpeedChecks = async (monitorId) => {
  try {
    const result = await PageSpeedCheck.deleteMany({ monitorId });
    return result.deletedCount;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPageSpeedCheck,
  getPageSpeedChecks,
  deletePageSpeedChecks,
};
