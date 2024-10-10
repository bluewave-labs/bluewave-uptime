const {
  inviteRoleValidation,
  inviteBodyValidation,
  inviteVerificationBodyValidation,
} = require("../validation/joi");
const logger = require("../utils/logger");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { handleError, handleValidationError } = require("./controllerUtils");
const SERVICE_NAME = "inviteController";

const getTokenFromHeaders = (headers) => {
  const authorizationHeader = headers.authorization;
  if (!authorizationHeader) throw new Error("No auth headers");

  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    throw new Error("Invalid auth headers");

  return parts[1];
};

/**
 * Issues an invitation to a new user. Only admins can invite new users. An invitation token is created and sent via email.
 * @async
 * @param {Object} req - The Express request object.
 * @property {Object} req.headers - The headers of the request.
 * @property {string} req.headers.authorization - The authorization header containing the JWT token.
 * @property {Object} req.body - The body of the request.
 * @property {string} req.body.email - The email of the user to be invited.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The response object with a success status, a message indicating the sending of the invitation, and the invitation token.
 * @throws {Error} If there is an error during the process, especially if there is a validation error (422).
 */
const issueInvitation = async (req, res, next) => {
  try {
    // Only admins can invite
    const token = getTokenFromHeaders(req.headers);
    const { role, firstname, teamId } = jwt.decode(token);
    req.body.teamId = teamId;
    try {
      await inviteRoleValidation.validateAsync({ roles: role });
      await inviteBodyValidation.validateAsync(req.body);
    } catch (error) {
      next(handleValidationError(error, SERVICE_NAME));
      return;
    }

    const inviteToken = await req.db.requestInviteToken({ ...req.body });
    const { clientHost } = req.settingsService.getSettings();
    req.emailService
      .buildAndSendEmail(
        "employeeActivationTemplate",
        {
          name: firstname,
          link: `${clientHost}/register/${inviteToken.token}`,
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
    next(handleError(error, SERVICE_NAME, "inviteController"));
  }
};

const inviteVerifyController = async (req, res, next) => {
  try {
    await inviteVerificationBodyValidation.validateAsync(req.body);
  } catch (error) {
    next(handleValidationError(error, SERVICE_NAME));
    return;
  }

  try {
    const invite = await req.db.getInviteToken(req.body.token);
    res
      .status(200)
      .json({ status: "success", msg: "Invite verified", data: invite });
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "inviteVerifyController"));
  }
};

module.exports = {
  inviteController: issueInvitation,
  inviteVerifyController,
};
