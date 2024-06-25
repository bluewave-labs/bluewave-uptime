const mongoose = require("mongoose");

const CheckSchema = mongoose.Schema(
  {
    monitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monitor",
      immutable: true,
    },
    status: {
      type: Boolean,
    },
    responseTime: {
      type: Number, // milliseconds
    },
    statusCode: {
      type: Number, // 200, ... , 500
    },
    message: {
      type: String,
    },
    expiry: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 30, // 30 days in seconds
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Check", CheckSchema);
