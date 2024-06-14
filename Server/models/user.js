const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10); //genSalt is asynchronous, need to wait
  this.password = await bcrypt.hash(this.password, salt); // hash is also async, need to eitehr await or use hashSync
  next();
});

UserSchema.methods.comparePassword = async function (submittedPassword) {
  res = await bcrypt.compare(submittedPassword, this.password);
  return res;
};

module.exports = mongoose.model("User", UserSchema);
