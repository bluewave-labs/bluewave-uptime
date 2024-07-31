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

/**
 * When a check is created, we should update the stauts of the associated monitor
 * if it has changed.  Monitor starts with default status: true
 * @param {function} next - Callback to proceed to the next middleware.
 */

CheckSchema.pre("save", async function (next) {
  try {
    const monitor = await mongoose.model("Monitor").findById(this.monitorId);
    if (monitor && monitor.status !== this.status) {
      if (monitor.status === true && this.status === false) {
        // Monitor down
        console.log("Monitor went down");
        await notifyUsers(this.monitorId, 'down');
      }

      if (monitor.status === false && this.status === true) {
        // Monitor up
        console.log("Monitor went up");
        await notifyUsers(this.monitorId, 'up');
      }
      monitor.status = this.status;
      await monitor.save();
    }
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
});

async function notifyUsers(monitorId, status) {
  const notifications = await mongoose.model('Notification').find({ monitorId });
  notifications.forEach(async (notification) => {
    const context = { monitorId, status }; 
    if (notification.type === 'email') {
      const template = status === 'down' ? 'serverIsDown' : 'serverIsUp';
      await sendEmail(notification.address, template, context);
    } else if (notification.type === 'sms') {
      const message = `Monitor ${monitorId} is ${status}`;
      await sendSMS(notification.phone, message);
    }
  });
}

module.exports = mongoose.model("Check", CheckSchema);
