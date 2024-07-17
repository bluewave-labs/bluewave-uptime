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

module.exports = mongoose.model("PageSpeedCheck", PageSpeedCheck);
