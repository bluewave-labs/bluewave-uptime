const mongoose = require("mongoose");

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
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LighthouseMetrics", MetricsSchema);
