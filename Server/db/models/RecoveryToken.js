const mongoose = require("mongoose");

const RecoveryTokenSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RecoveryToken", RecoveryTokenSchema);
