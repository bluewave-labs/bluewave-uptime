const InviteToken = require("../../../models/InviteToken");
const crypto = require("crypto");
const { errorMessages } = require("../../../utils/messages");

const requestInviteToken = async (req, res) => {
  try {
    await InviteToken.deleteMany({ email: req.body.email });
    let inviteToken = new InviteToken({
      email: req.body.email,
      role: req.body.role,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await inviteToken.save();
    return inviteToken;
  } catch (error) {
    throw error;
  }
};

const getInviteToken = async (req, res) => {
  try {
    const invite = await InviteToken.findOneAndDelete({
      token: req.body.token,
    });
    if (invite === null) {
      throw new Error(errorMessages.AUTH_INVITE_NOT_FOUND);
    }
    return invite;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  requestInviteToken,
  getInviteToken,
};
