const Notification = require("../../../models/Notification");

/**
 * Creates a new notification.
 * @param {Object} notificationData - The data for the new notification.
 * @param {mongoose.Types.ObjectId} notificationData.monitorId - The ID of the monitor.
 * @param {string} notificationData.type - The type of the notification (e.g., "email", "sms").
 * @param {string} [notificationData.address] - The address for the notification (if applicable).
 * @param {string} [notificationData.phone] - The phone number for the notification (if applicable).
 * @returns {Promise<Object>} The created notification.
 * @throws Will throw an error if the notification cannot be created.
 */
const createNotification = async (notificationData) => {
  try {
    const notification = await new Notification({ ...notificationData }).save();
    return notification;
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves notifications by monitor ID.
 * @param {mongoose.Types.ObjectId} monitorId - The ID of the monitor.
 * @returns {Promise<Array<Object>>} An array of notifications.
 * @throws Will throw an error if the notifications cannot be retrieved.
 */
const getNotificationsByMonitorId = async (monitorId) => {
  try {
    const notifications = await Notification.find({ monitorId });
    return notifications;
  } catch (error) {
    throw error;
  }
};

const deleteNotificationsByMonitorId = async (monitorId) => {
  try {
    const result = await Notification.deleteMany({ monitorId });
    return result.deletedCount;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNotification,
  getNotificationsByMonitorId,
  deleteNotificationsByMonitorId,
};
