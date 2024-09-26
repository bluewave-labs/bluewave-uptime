const AppSettings = require("../../../models/AppSettings");
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

module.exports = {
  getAppSettings,
};
