const mongoose = require("mongoose");

/**
 * Mongoose schema for storing metrics from Google Lighthouse.
 * @typedef {Object} MetricsSchema
 * @property {mongoose.Schema.Types.ObjectId} monitorId - Reference to the Monitor model.
 * @property {Object} accessibility - Metrics related to accessibility category.
 * @property {Object} bestPractices - Metrics related to best practices category.
 * @property {Object} seo - Metrics related to SEO category.
 * @property {Object} performance - Metrics related to performance category.
 */

const MetricsSchema = mongoose.Schema(
  {
    monitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monitor",
      immutable: true,
    },
    accessibility: {
      type: Object,
      required: true,
    },
    bestPractices: {
      type: Object,
      required: true,
    },
    seo: {
      type: Object,
      required: true,
    },
    performance: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Mongoose model for storing metrics from Google Lighthouse.
 * @typedef {mongoose.Model<MetricsSchema>} LighthouseMetricsModel
 */

module.exports = mongoose.model("LighthouseMetrics", MetricsSchema);
