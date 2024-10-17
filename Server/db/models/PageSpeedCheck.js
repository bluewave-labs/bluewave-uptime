import mongoose from "mongoose";
const AuditSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  score: { type: Number, required: true },
  scoreDisplayMode: { type: String, required: true },
  displayValue: { type: String, required: true },
  numericValue: { type: Number, required: true },
  numericUnit: { type: String, required: true },
});

const AuditsSchema = mongoose.Schema({
  cls: {
    type: AuditSchema,
    required: true,
  },
  si: {
    type: AuditSchema,
    required: true,
  },
  fcp: {
    type: AuditSchema,
    required: true,
  },
  lcp: {
    type: AuditSchema,
    required: true,
  },
  tbt: {
    type: AuditSchema,
    required: true,
  },
});

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
    audits: {
      type: AuditsSchema,
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

export default mongoose.model("PageSpeedCheck", PageSpeedCheck);
