const MaintenanceWindow = require("../../../models/MaintenanceWindow");

/**
 * Asynchronously creates a new MaintenanceWindow document and saves it to the database.
 * If the maintenance window is a one-time event, the expiry field is set to the same value as the end field.
 * @async
 * @function createMaintenanceWindow
 * @param {Object} maintenanceWindowData - The data for the new MaintenanceWindow document.
 * @param {mongoose.Schema.Types.ObjectId} maintenanceWindowData.monitorId - The ID of the monitor.
 * @param {Boolean} maintenanceWindowData.active - Indicates whether the maintenance window is active.
 * @param {Boolean} maintenanceWindowData.oneTime - Indicates whether the maintenance window is a one-time event.
 * @param {Date} maintenanceWindowData.start - The start date and time of the maintenance window.
 * @param {Date} maintenanceWindowData.end - The end date and time of the maintenance window.
 * @returns {Promise<MaintenanceWindow>} The saved MaintenanceWindow document.
 * @throws {Error} If there is an error saving the document.
 * @example
 * const maintenanceWindowData = {
 *   monitorId: 'yourMonitorId',
 *   active: true,
 *   oneTime: true,
 *   start: new Date(),
 *   end: new Date(),
 * };
 * createMaintenanceWindow(maintenanceWindowData)
 *   .then(maintenanceWindow => console.log(maintenanceWindow))
 *   .catch(error => console.error(error));
 */
const createMaintenanceWindow = async (maintenanceWindowData) => {
  try {
    const maintenanceWindow = new MaintenanceWindow({
      ...maintenanceWindowData,
    });

    // If the maintenance window is a one time window, set the expiry to the end date
    if (maintenanceWindowData.oneTime) {
      maintenanceWindow.expiry = maintenanceWindowData.end;
    }
    const result = maintenanceWindow.save();
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Asynchronously retrieves all MaintenanceWindow documents associated with a specific user ID.
 * @async
 * @function getMaintenanceWindowByUserId
 * @param {String} userId - The ID of the user.
 * @returns {Promise<Array<MaintenanceWindow>>} An array of MaintenanceWindow documents.
 * @throws {Error} If there is an error retrieving the documents.
 * @example
 * getMaintenanceWindowByUserId('userId')
 *   .then(maintenanceWindows => console.log(maintenanceWindows))
 *   .catch(error => console.error(error));
 */
const getMaintenanceWindowByUserId = async (userId) => {
  try {
    const maintenanceWindows = await MaintenanceWindow.find({ userId: userId });
    return maintenanceWindows;
  } catch (error) {
    throw error;
  }
};

/**
 * Asynchronously retrieves all MaintenanceWindow documents associated with a specific monitor ID.
 * @async
 * @function getMaintenanceWindowsByMonitorId
 * @param {mongoose.Schema.Types.ObjectId} monitorId - The ID of the monitor.
 * @returns {Promise<Array<MaintenanceWindow>>} An array of MaintenanceWindow documents.
 * @throws {Error} If there is an error retrieving the documents.
 * @example
 * getMaintenanceWindowsByMonitorId('monitorId')
 *   .then(maintenanceWindows => console.log(maintenanceWindows))
 *   .catch(error => console.error(error));
 */
const getMaintenanceWindowsByMonitorId = async (monitorId) => {
  try {
    const maintenanceWindows = await MaintenanceWindow.find({
      monitorId: monitorId,
    });
    return maintenanceWindows;
  } catch (error) {
    throw error;
  }
};

/**
 * Asynchronously deletes a MaintenanceWindow document by its ID.
 * @async
 * @function deleteMaintenaceWindowById
 * @param {mongoose.Schema.Types.ObjectId} maintenanceWindowId - The ID of the MaintenanceWindow document to delete.
 * @returns {Promise<MaintenanceWindow>} The deleted MaintenanceWindow document.
 * @throws {Error} If there is an error deleting the document.
 * @example
 * deleteMaintenaceWindowById('maintenanceWindowId')
 *   .then(maintenanceWindow => console.log(maintenanceWindow))
 *   .catch(error => console.error(error));
 */
const deleteMaintenaceWindowById = async (maintenanceWindowId) => {
  try {
    const maintenanceWindow =
      await MaintenanceWindow.findByIdAndDelete(maintenanceWindowId);
    return maintenanceWindow;
  } catch (error) {
    throw error;
  }
};

/**
 * Asynchronously deletes all MaintenanceWindow documents associated with a specific monitor ID.
 * @async
 * @function deleteMaintenanceWindowByMonitorId
 * @param {mongoose.Schema.Types.ObjectId} monitorId - The ID of the monitor.
 * @returns {Promise<Object>} The result of the delete operation. This object contains information about the operation, such as the number of documents deleted.
 * @throws {Error} If there is an error deleting the documents.
 * @example
 * deleteMaintenanceWindowByMonitorId('monitorId')
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error));
 */
const deleteMaintenanceWindowByMonitorId = async (monitorId) => {
  try {
    const result = await MaintenanceWindow.deleteMany({ monitorId: monitorId });
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Asynchronously deletes all MaintenanceWindow documents associated with a specific user ID.
 * @async
 * @function deleteMaintenanceWindowByUserId
 * @param {String} userId - The ID of the user.
 * @returns {Promise<Object>} The result of the delete operation. This object contains information about the operation, such as the number of documents deleted.
 * @throws {Error} If there is an error deleting the documents.
 * @example
 * deleteMaintenanceWindowByUserId('userId')
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error));
 */
const deleteMaintenanceWindowByUserId = async (userId) => {
  try {
    const result = await MaintenanceWindow.deleteMany({ userId: userId });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMaintenanceWindow,
  getMaintenanceWindowByUserId,
  getMaintenanceWindowsByMonitorId,
  deleteMaintenaceWindowById,
  deleteMaintenanceWindowByMonitorId,
  deleteMaintenanceWindowByUserId,
};
