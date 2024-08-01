const mongoose = require("mongoose");
const UserModel = require("../../models/user");

//****************************************
// DB Connection
//****************************************

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    throw error;
  }
};

const checkAdmin = async (req, res) => {
  try {
    const admin = await UserModel.findOne({ role: "admin" });
    if (admin !== null) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

//****************************************
// User Operations
//****************************************

const {
  insertUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("./modules/userModule");

//****************************************
// Invite Token Operations
//****************************************

const {
  requestInviteToken,
  getInviteToken,
} = require("./modules/inviteModule");

//****************************************
// Recovery Operations
//****************************************
const {
  requestRecoveryToken,
  validateRecoveryToken,
  resetPassword,
} = require("./modules/recoveryModule");

//****************************************
//  Monitors
//****************************************

const {
  getAllMonitors,
  getMonitorById,
  getMonitorsByUserId,
  createMonitor,
  deleteMonitor,
  deleteAllMonitors,
  deleteMonitorsByUserId,
  editMonitor,
} = require("./modules/monitorModule");

//****************************************
// Page Speed Checks
//****************************************

const {
  createPageSpeedCheck,
  getPageSpeedChecks,
  deletePageSpeedChecks,
} = require("./modules/pageSpeedCheckModule");

//****************************************
// Checks
//****************************************

const {
  createCheck,
  getChecks,
  deleteChecks,
} = require("./modules/checkModule");

//****************************************
// Alerts
//****************************************

const {
  createAlert,
  getAlertsByUserId,
  getAlertsByMonitorId,
  getAlertById,
  editAlert,
  deleteAlert,
  deleteAlertByMonitorId,
} = require("./modules/alertModule");

//****************************************
// Maintenance Window
//****************************************
const {
  createMaintenanceWindow,
  getMaintenanceWindowsByUserId,
  getMaintenanceWindowsByMonitorId,
  deleteMaintenaceWindowById,
  deleteMaintenanceWindowByMonitorId,
  deleteMaintenanceWindowByUserId,
} = require("./modules/maintenaceWindowModule");

const {
  createNotification,
  getNotificationsByMonitorId,
  deleteNotificationsByMonitorId,
} = require("./modules/notificationModule");

module.exports = {
  connect,
  insertUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers,
  requestInviteToken,
  getInviteToken,
  requestRecoveryToken,
  validateRecoveryToken,
  resetPassword,
  checkAdmin,
  getAllMonitors,
  getMonitorById,
  getMonitorsByUserId,
  createMonitor,
  deleteMonitor,
  deleteAllMonitors,
  editMonitor,
  createCheck,
  getChecks,
  deleteChecks,
  createAlert,
  getAlertsByUserId,
  getAlertsByMonitorId,
  getAlertById,
  editAlert,
  deleteAlert,
  deleteAlertByMonitorId,
  deleteMonitorsByUserId,
  createPageSpeedCheck,
  getPageSpeedChecks,
  deletePageSpeedChecks,
  createMaintenanceWindow,
  getMaintenanceWindowsByUserId,
  getMaintenanceWindowsByMonitorId,
  deleteMaintenaceWindowById,
  deleteMaintenanceWindowByMonitorId,
  deleteMaintenanceWindowByUserId,
  createNotification,
  getNotificationsByMonitorId,
  deleteNotificationsByMonitorId,
};
