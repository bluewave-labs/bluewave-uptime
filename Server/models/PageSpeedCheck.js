const mongoose = require("mongoose");

/**
 * Mongoose schema for storing metrics from Google Lighthouse.
 * @typedef {Object} PageSpeedCheck
 * @property {mongoose.Schema.Types.ObjectId} monitorId - Reference to the Monitor model.
 * @property {number} accessibility - Accessibility score.
 * @property {number} bestPractices - Best practices score.
 * @property {number} seo - SEO score.
 * @property {number} performance - Performance score.
 */

const PageSpeedCheck = mongoose.Schema(
  {
    monitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monitor",
      immutable: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    accessibility: {
      type: Number,
      required: true,
    },
    bestPractices: {
      type: Number,
      required: true,
    },
    seo: {
      type: Number,
      required: true,
    },
    performance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Mongoose model for storing metrics from Google Lighthouse.
 * @typedef {mongoose.Model<PageSpeedCheck>} LighthouseMetricsModel
 */

PageSpeedCheck.pre("save", async function (next) {
  try {
    const monitor = await mongoose.model("Monitor").findById(this.monitorId);
    if (monitor && monitor.status !== this.status) {
      if (monitor.status === true && this.status === false) {
        // TODO issue alert
        console.log("Monitor went down");
      }

      if (monitor.status === false && this.status === true) {
        // TODO issue alert
        console.log("Monitor went up");
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

module.exports = mongoose.model("PageSpeedCheck", PageSpeedCheck);
