const {
  inviteRoleValidation,
  inviteBodyValidation,
  inviteVerifciationBodyValidation,
} = require("../validation/joi");
const logger = require("../utils/logger");
require("dotenv").config();
const { errorMessages, successMessages } = require("../utils/messages");
var jwt = require("jsonwebtoken");
const SERVICE_NAME = "inviteController";

const getTokenFromHeaders = (headers) => {
  const authorizationHeader = headers.authorization;
  if (!authorizationHeader) throw new Error("No auth headers");

  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    throw new Error("Invalid auth headers");

  return parts[1];
};

const inviteController = async (req, res, next) => {
  try {
    // Only admins can invite
    const token = getTokenFromHeaders(req.headers);
    const { role, firstname, teamId } = jwt.decode(token);
    req.body.teamId = teamId;
    try {
      await inviteRoleValidation.validateAsync({ roles: role });
      await inviteBodyValidation.validateAsync(req.body);
    } catch (error) {
      error.status = 422;
      error.service = SERVICE_NAME;
      error.message =
        error.details?.[0]?.message || error.message || "Validation Error";
      next(error);
      return;
    }

    const inviteToken = await req.db.requestInviteToken({ ...req.body });
    req.emailService
      .buildAndSendEmail(
        "employeeActivationTemplate",
        {
          name: firstname,
          link: `${process.env.CLIENT_HOST}/register/${inviteToken.token}`,
        },
        req.body.email,
        "Welcome to Uptime Monitor"
      )
      .catch((error) => {
        logger.error("Error sending invite email", {
          service: SERVICE_NAME,
          error: error.message,
        });
      });

    return res
      .status(200)
      .json({ success: true, msg: "Invite sent", data: inviteToken });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
    return;
  }
};

const inviteVerifyController = async (req, res, next) => {
  try {
    await inviteVerifciationBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const invite = await req.db.getInviteToken(req.body.token);
    res
      .status(200)
      .json({ status: "success", msg: "Invite verified", data: invite });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
    return;
  }
};

module.exports = {
  inviteController,
  inviteVerifyController,
};
