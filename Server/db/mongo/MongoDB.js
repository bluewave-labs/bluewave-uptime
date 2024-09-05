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

const checkSuperadmin = async (req, res) => {
  try {
    const superAdmin = await UserModel.findOne({ role: "superadmin" });
    if (superAdmin !== null) {
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
  logoutUser,
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
  getMonitorStatsById,
  getMonitorById,
  getMonitorsAndSummaryByTeamId,
  getMonitorsByTeamId,
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
  deletePageSpeedChecksByMonitorId,
} = require("./modules/pageSpeedCheckModule");

//****************************************
// Checks
//****************************************

const {
  createCheck,
  getChecksCount,
  getChecks,
  getTeamChecks,
  deleteChecks,
  deleteChecksByTeamId,
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
  logoutUser,
  requestInviteToken,
  getInviteToken,
  requestRecoveryToken,
  validateRecoveryToken,
  resetPassword,
  checkSuperadmin,
  getAllMonitors,
  getMonitorStatsById,
  getMonitorById,
  getMonitorsAndSummaryByTeamId,
  getMonitorsByTeamId,
  createMonitor,
  deleteMonitor,
  deleteAllMonitors,
  editMonitor,
  createCheck,
  getChecksCount,
  getChecks,
  getTeamChecks,
  deleteChecks,
  deleteChecksByTeamId,
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
  deletePageSpeedChecksByMonitorId,
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
