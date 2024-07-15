const mongoose = require("mongoose");

const MetricsSchema = mongoose.Schema(
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

module.exports = mongoose.model("LighthouseMetrics", MetricsSchema);
