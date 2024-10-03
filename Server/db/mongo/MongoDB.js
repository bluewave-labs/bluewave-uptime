const mongoose = require("mongoose");
const UserModel = require("../models/User");
const AppSettings = require("../models/AppSettings");

//****************************************
// DB Connection
//****************************************

const connect = async () => {
  try {
    const connectionString =
      process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/uptime_db";
    await mongoose.connect(connectionString);
    // If there are no AppSettings, create one
    let appSettings = await AppSettings.find();
    if (appSettings.length === 0) {
      appSettings = new AppSettings({});
      await appSettings.save();
    }

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
  deleteTeam,
  deleteAllOtherUsers,
  getAllUsers,
  logoutUser,
} = require("./modules/userModule");

//****************************************
// Invite Token Operations
//****************************************

const {
  requestInviteToken,
  getInviteToken,
  getInviteTokenAndDelete,
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
  addDemoMonitors,
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
  updateChecksTTL,
} = require("./modules/checkModule");

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

//****************************************
// Notifications
//****************************************
const {
  createNotification,
  getNotificationsByMonitorId,
  deleteNotificationsByMonitorId,
} = require("./modules/notificationModule");

//****************************************
// AppSettings
//****************************************
const {
  getAppSettings,
  updateAppSettings,
} = require("./modules/settingsModule");

module.exports = {
  connect,
  insertUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  deleteTeam,
  deleteAllOtherUsers,
  getAllUsers,
  logoutUser,
  requestInviteToken,
  getInviteToken,
  getInviteTokenAndDelete,
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
  addDemoMonitors,
  createCheck,
  getChecksCount,
  getChecks,
  getTeamChecks,
  deleteChecks,
  deleteChecksByTeamId,
  updateChecksTTL,
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
  getAppSettings,
  updateAppSettings,
};
