const { successMessages } = require("../utils/messages");
const SERVICE_NAME = "SettingsController";
const { updateAppSettingsBodyValidation } = require("../validation/joi");

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
    next(error);
  }
};

const updateAppSettings = async (req, res, next) => {
  try {
    await updateAppSettingsBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const settings = await req.db.updateAppSettings(req.body);
    const updatedSettings = await req.settingsService.reloadSettings();
    return res.status(200).json({
      success: true,
      msg: successMessages.UPDATE_APP_SETTINGS,
      data: updatedSettings,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "updateAppSettings") : null;
    next(error);
  }
};

module.exports = {
  getAppSettings,
  updateAppSettings,
};
