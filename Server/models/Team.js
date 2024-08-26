const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    immutable: true,
  },
  timestamps: true,
});

module.exports = mongoose.model("Team", TeamSchema);
