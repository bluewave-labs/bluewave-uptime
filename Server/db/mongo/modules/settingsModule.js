const AppSettings = require("../../models/AppSettings");
const SERVICE_NAME = "SettingsModule";

const getAppSettings = async () => {
  try {
    const settings = AppSettings.findOne();
    return settings;
  } catch (error) {
    error.service = SERVICE_NAME;
    error.method = "getSettings";
    throw error;
  }
};

const updateAppSettings = async (newSettings) => {
  try {
    const settings = await AppSettings.findOneAndUpdate(
      {},
      { $set: newSettings },
      { new: true }
    );
    return settings;
  } catch (error) {
    error.service = SERVICE_NAME;
    error.method = "updateAppSettings";
    throw error;
  }
};

module.exports = {
  getAppSettings,
  updateAppSettings,
};
