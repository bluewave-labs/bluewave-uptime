const mongoose = require("mongoose");

const AppSettingsSchema = mongoose.Schema(
  {
    apiBaseUrl: {
      type: String,
      required: true,
      default: "http://localhost:5000/api/v1",
    },
    logLevel: {
      type: String,
      default: "debug",
      enum: ["debug", "none", "error", "warn"],
    },
    clientHost: {
      type: String,
      required: true,
      default: "http://localhost:5173",
    },
    jwtSecret: {
      type: String,
      required: true,
      default: "my_secret",
    },
    dbType: {
      type: String,
      required: true,
      default: "MongoDB",
    },
    dbConnectionString: {
      type: String,
      required: true,
      default: "mongodb://localhost:27017/uptime_db",
    },
    redisHost: {
      type: String,
      required: true,
      default: "127.0.0.1",
    },
    redisPort: {
      type: Number,
      default: "6379",
    },
    jwtTTL: {
      type: String,
      required: true,
      default: "99d",
    },
    pagespeedApiKey: {
      type: String,
    },
    systemEmailHost: {
      type: String,
    },
    systemEmailPort: {
      type: Number,
    },
    systemEmailAddress: {
      type: String,
    },
    systemEmailAddress: {
      type: String,
    },
    singleton: {
      type: Boolean,
      required: true,
      unique: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AppSettings", AppSettingsSchema);
