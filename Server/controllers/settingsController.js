const { successMessages } = require("../utils/messages");
const SERVICE_NAME = "SettingsController";

const getAppSettings = async (req, res, next) => {
  try {
    const settings = await req.db.getAppSettings();
    return res.status(200).json({
      success: true,
      msg: successMessages.GET_APP_SETTINGS,
      data: settings,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "getAppSettings") : null;
  }
};

module.exports = {
  getAppSettings,
};
