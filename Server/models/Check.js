const mongoose = require("mongoose");
const EmailService = require("../service/emailService");
const Notification = require("../models/Notification");

/**
 * Check Schema for MongoDB collection.
 *
 * Represents a check associated with a monitor, storing information
 * about the status and response of a particular check event.
 */
const CheckSchema = mongoose.Schema(
  {
    /**
     * Reference to the associated Monitor document.
     *
     * @type {mongoose.Schema.Types.ObjectId}
     */
    monitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monitor",
      immutable: true,
    },
    /**
     * Status of the check (true for up, false for down).
     *
     * @type {Boolean}
     */
    status: {
      type: Boolean,
    },
    /**
     * Response time of the check in milliseconds.
     *
     * @type {Number}
     */
    responseTime: {
      type: Number,
    },
    /**
     * HTTP status code received during the check.
     *
     * @type {Number}
     */
    statusCode: {
      type: Number,
    },
    /**
     * Message or description of the check result.
     *
     * @type {String}
     */
    message: {
      type: String,
    },
    /**
     * Expiry date of the check, auto-calculated to expire after 30 days.
     *
     * @type {Date}
     */

    expiry: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 30, // 30 days
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Check", CheckSchema);