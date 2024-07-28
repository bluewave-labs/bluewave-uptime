const MaintenanceWindow = require("../../../models/MaintenanceWindow");

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

const getMaintenanceWindowByUserId = async (userId) => {
  try {
    const maintenanceWindows = await MaintenanceWindow.find({ userId: userId });
    return maintenanceWindows;
  } catch (error) {
    throw error;
  }
};

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

const deleteMaintenaceWindowById = async (maintenanceWindowId) => {
  try {
    const maintenanceWindow =
      await MaintenanceWindow.findByIdAndDelete(maintenanceWindowId);
    return maintenanceWindow;
  } catch (error) {
    throw error;
  }
};

const deleteMaintenanceWindowByMonitorId = async (monitorId) => {
  try {
    const result = await MaintenanceWindow.deleteMany({ monitorId: monitorId });
    return result;
  } catch (error) {
    throw error;
  }
};

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
