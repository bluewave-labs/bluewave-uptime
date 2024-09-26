const AppSettings = require("../models/AppSettings");
const SERVICE_NAME = "SettingsService";

class SettingsService {
  constructor() {
    this.settings = null;
  }

  async loadSettings() {
    if (!this.settings) {
      try {
        this.settings = await AppSettings.findOne();
        if (!this.settings) {
          throw new Error("Settings not found");
        }
        return this.settings;
      } catch (error) {
        error.service === undefined ? (error.service = SERVICE_NAME) : null;
        error.method === undefined ? (error.method = "loadSettings") : null;
        throw error;
      }
    }
  }

  async reloadSettings() {
    try {
      this.settings = await AppSettings.findOne();
      if (!this.settings) {
        throw new Error("Settings not found");
      }
    } catch (error) {
      error.service === undefined ? (error.service = SERVICE_NAME) : null;
      error.method === undefined ? (error.method = "reloadSettings") : null;
      throw error;
    }
  }

  getSettings() {
    if (!this.settings) {
      throw new Error("Settings have not been loaded");
    }
    return this.settings;
  }
}

module.exports = SettingsService;
