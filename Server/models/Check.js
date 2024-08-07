const mongoose = require("mongoose");
const EmailService = require("../service/emailService");

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
      type: Number, 
    },
    statusCode: {
      type: Number, 
    },
    message: {
      type: String,
    },
    expiry: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 30, 
    },
  },
  {
    timestamps: true,
  }
);

CheckSchema.pre("save", async function (next) {
  try {
    const monitor = await mongoose.model("Monitor").findById(this.monitorId);

    if (monitor) {
      // Check if the monitor has notifications
      if (monitor.notifications && monitor.notifications.length > 0) {
        // Only send email if monitor status has changed
        if (monitor.status !== this.status) {
          const emailService = new EmailService();

          if (monitor.status === true && this.status === false) {
            // Notify users that the monitor is down
            for (const notification of monitor.notifications) {
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
            for (const notification of monitor.notifications) {
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
