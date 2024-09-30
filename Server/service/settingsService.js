const { env } = require("process");
const AppSettings = require("../models/AppSettings");
const SERVICE_NAME = "SettingsService";
const envConfig = {
  clientHost: process.env.CLIENT_HOST,
  jwtSecret: process.env.JWT_SECRET,
  dbType: process.env.DB_TYPE,
  dbConnectionString: process.env.DB_CONNECTION_STRING,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  jwtTTL: process.env.TOKEN_TTL,
  pagespeedApiKey: process.env.PAGESPEED_API_KEY,
  systemEmailHost: process.env.SYSTEM_EMAIL_HOST,
  systemEmailPort: process.env.SYSTEM_EMAIL_PORT,
  systemEmailAddress: process.env.SYSTEM_EMAIL_ADDRESS,
  systemEmailPassword: process.env.SYSTEM_EMAIL_PASSWORD,
};

class SettingsService {
  constructor() {
    this.settings = envConfig;
  }

  async loadSettings() {
    try {
      const dbSettings = await AppSettings.findOne();
      if (!this.settings) {
        throw new Error("Settings not found");
      }

      // Try to load settings from env first, if not found, load from db
      for (const key in envConfig) {
        if (envConfig[key] === undefined && dbSettings[key] !== undefined) {
          this.settings[key] = dbSettings[key];
        }
      }

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

  async reloadSettings() {
    return this.loadSettings();
  }

  getSettings() {
    if (!this.settings) {
      throw new Error("Settings have not been loaded");
    }
    return this.settings;
  }
}

module.exports = SettingsService;
