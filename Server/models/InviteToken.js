const mongoose = require("mongoose");

const InviteTokenSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: Array,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InviteToken", InviteTokenSchema);
