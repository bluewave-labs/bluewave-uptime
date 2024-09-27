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
  tokenTTL: process.env.TOKEN_TTL,
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
      for (const key in envConfig) {
        if (envConfig[key] === undefined && dbSettings[key] !== undefined) {
          this.settings[key] = dbSettings[key];
        }
      }
      return this.settings;
    } catch (error) {
      error.service === undefined ? (error.service = SERVICE_NAME) : null;
      error.method === undefined ? (error.method = "loadSettings") : null;
      throw error;
    }
  }

  async reloadSettings() {
    try {
      const dbSettings = await AppSettings.findOne();

      for (const key in envConfig) {
        if (envConfig[key] === undefined && dbSettings[key] !== undefined) {
          this.settings[key] = dbSettings[key];
        }
      }
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
