const AppSettings = require("../models/AppSettings");
const SERVICE_NAME = "SettingsService";

CLIENT_HOST = process.env.CLIENT_HOST;
JWT_SECRET = process.env.JWT_SECRET;
DB_TYPE = process.env.DB_TYPE;
DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
REDIS_HOST = process.env.REDIS_HOST;
REDIS_PORT = process.env.REDIS_PORT;
TOKEN_TTL = process.env.TOKEN_TTL;
PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY;
SYSTEM_EMAIL_HOST = process.env.SYSTEM_EMAIL_HOST;
SYSTEM_EMAIL_PORT = process.env.SYSTEM_EMAIL_PORT;
SYSTEM_EMAIL_ADDRESS = process.env.SYSTEM_EMAIL_ADDRESS;
SYSTEM_EMAIL_PASSWORD = process.env.SYSTEM_EMAIL_PASSWORD;
class SettingsService {
  constructor() {
    this.settings = {
      clientHost: CLIENT_HOST,
      jwtSecret: JWT_SECRET,
      dbType: DB_TYPE,
      dbConnectionString: DB_CONNECTION_STRING,
      redisHost: REDIS_HOST,
      redisPort: REDIS_PORT,
      tokenTTL: TOKEN_TTL,
      pagespeedApiKey: PAGESPEED_API_KEY,
      systemEmailHost: SYSTEM_EMAIL_HOST,
      systemEmailPort: SYSTEM_EMAIL_PORT,
      systemEmailAddress: SYSTEM_EMAIL_ADDRESS,
      systemEmailPassword: SYSTEM_EMAIL_PASSWORD,
    };
  }

  async loadSettings() {
    try {
      const dbSettings = await AppSettings.findOne();
      if (!this.settings) {
        throw new Error("Settings not found");
      }
      for (const key in this.settings) {
        if (this.settings[key] === undefined && dbSettings[key] !== undefined) {
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
