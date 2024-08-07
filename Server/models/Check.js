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

/**
 * Pre-save middleware to handle status change notifications.
 * 
 * This middleware checks if the status of the monitor associated
 * with the check has changed and sends notifications if necessary.
 */
CheckSchema.pre("save", async function (next) {
  try {
    const monitor = await mongoose.model("Monitor").findById(this.monitorId);

    if (monitor) {
      const notifications = await Notification.find({ monitorId: this.monitorId });

      // Check if there are any notifications
      if (notifications && notifications.length > 0) {
        // Only send email if monitor status has changed
        if (monitor.status !== this.status) {
          const emailService = new EmailService();

          if (monitor.status === true && this.status === false) {
            // Notify users that the monitor is down
            for (const notification of notifications) {
              if (notification.email) {
                await emailService.buildAndSendEmail(
                  "serverIsDownTemplate",
                  { monitorName: monitor.name, monitorUrl: monitor.url },
                  notification.email,
                  `Monitor ${monitor.name} is down`
                );
              }
            }
          }

          if (monitor.status === false && this.status === true) {
            // Notify users that the monitor is up
            for (const notification of notifications) {
              if (notification.email) {
                await emailService.buildAndSendEmail(
                  "serverIsUpTemplate",
                  { monitorName: monitor.name, monitorUrl: monitor.url },
                  notification.email,
                  `Monitor ${monitor.name} is back up`
                );
              }
            }
          }

          // Update monitor status
          monitor.status = this.status;
          await monitor.save();
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
});


module.exports = mongoose.model("Check", CheckSchema);
