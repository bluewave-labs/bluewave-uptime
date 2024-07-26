const Alert = require("../../../models/Alert");

/**
 * Creates an Alert associated with a Monitor and User
 * @async
 * @param {Object} alertData
 * @param {string} alertData.checkId
 * @param {string} alert.monitorId
 * @param {string} alert.userId
 * @param {boolean} alert.status
 * @param {string} alert.message
 * @param {boolean} alert.notifiedStatus
 * @param {boolean} alert.acknowledgeStatus
 * @returns {<Promise<Alert>>}
 * @throws {Error}
 */
const createAlert = async (alertData) => {
  try {
    const alert = await new Alert({ ...alertData }).save();
    return alert;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all alerts a User has set
 * @async
 * @param {string} userId
 * @returns {<Promise<Array<Alert>>}
 * @throws {Error}
 */
const getAlertsByUserId = async (userId) => {
  try {
    const alerts = await Alert.find({ userId });
    return alerts;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all alerts a for an associated Monitor
 * @async
 * @param {string} monitorId
 * @returns {<Promise<Array<Alert>>}
 * @throws {Error}
 */
const getAlertsByMonitorId = async (monitorId) => {
  try {
    const alerts = await Alert.find({ monitorId });
    return alerts;
  } catch (error) {
    throw error;
  }
};

/**
 * Returns an alert with specified ID
 * @async
 * @param {string} alertId
 * @returns {Promise<Alert>}
 * @throws {Error}
 */
const getAlertById = async (alertId) => {
  try {
    const alert = await Alert.findById(alertId);
    return alert;
  } catch (error) {
    throw error;
  }
};

/**
 * Returns an edited alert with the specified ID
 * @async
 * @param {string} alertId
 * @param {Object} alertData
 * @param {string} alertData.checkId
 * @param {string} alertData.monitorId
 * @param {string} alertData.userId
 * @param {boolean} alertData.status
 * @param {string} alertData.message
 * @param {boolean} alertData.notifiedStatus
 * @param {boolean} alertData.acknowledgeStatus
 * @param {Express.Response} res
 * @returns {Promise<Alert>>}
 * @throws {Error}
 */
const editAlert = async (alertId, alertData) => {
  try {
    const editedAlert = await Alert.findByIdAndUpdate(alertId, alertData, {
      new: true,
    });
    return editedAlert;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes an alert with the specified ID
 * @async
 * @param {string} alertId
 * @throws {Error}
 */
const deleteAlert = async (alertId) => {
  try {
    const result = await Alert.findByIdAndDelete(alertId);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes alerts by monitor ID.
 *
 * @param {string} monitorId - The ID of the monitor.
 * @returns {Promise} A promise that resolves to the result of the delete operation.
 * @throws {Error} If an error occurs while deleting the alerts.
 */
const deleteAlertByMonitorId = async (monitorId) => {
  try {
    const result = await Alert.deleteMany({ monitorId });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAlert,
  getAlertsByUserId,
  getAlertsByMonitorId,
  getAlertById,
  editAlert,
  deleteAlert,
  deleteAlertByMonitorId,
};
