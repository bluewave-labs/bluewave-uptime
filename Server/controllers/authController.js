const express = require("express");
const {
  registrationBodyValidation,
  loginValidation,
  editUserParamValidation,
  editUserBodyValidation,
  recoveryValidation,
  recoveryTokenValidation,
  newPasswordValidation,
  deleteUserParamValidation,
  inviteRoleValidation,
  inviteBodyValidation,
  inviteVerifciationBodyValidation,
} = require("../validation/joi");
const logger = require("../utils/logger");
require("dotenv").config();
const { errorMessages, successMessages } = require("../utils/messages");
var jwt = require("jsonwebtoken");
const SERVICE_NAME = "AuthController";
const { getTokenFromHeaders } = require("../utils/utils");

/**
 * Creates and returns JWT token with an arbitrary payload
 * @function
 * @param {Object} payload
 * @returns {String}
 */
const issueToken = (payload) => {
  //TODO Add proper expiration date
  const tokenTTL = process.env.TOKEN_TTL ? process.env.TOKEN_TTL : "2h";
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: tokenTTL });
};

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {{success: Boolean, msg: String}}
 */
const registerController = async (req, res, next) => {
  // joi validation
  try {
    await registrationBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }
  // Create a new user
  try {
    const { inviteToken } = req.body;
    // If superAdmin exists, a token should be attached to all further register requests
    const superAdminExists = await req.db.checkSuperadmin(req, res);
    if (superAdminExists) {
      await req.db.getInviteTokenAndDelete(inviteToken);
    }
    const newUser = await req.db.insertUser({ ...req.body }, req.file);
    logger.info(successMessages.AUTH_CREATE_USER, {
      service: SERVICE_NAME,
      userId: newUser._id,
    });

    const userForToken = { ...newUser._doc };
    delete userForToken.profileImage;
    delete userForToken.avatarImage;

    const token = issueToken(userForToken);

    req.emailService
      .buildAndSendEmail(
        "welcomeEmailTemplate",
        { name: newUser.firstName },
        newUser.email,
        "Welcome to Uptime Monitor"
      )
      .catch((error) => {
        logger.error("Error sending welcome email", {
          service: SERVICE_NAME,
          error: error.message,
        });
      });

    return res.status(200).json({
      success: true,
      msg: successMessages.AUTH_CREATE_USER,
      data: { user: newUser, token: token },
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "registerController") : null;
    next(error);
  }
};

/**
 * Returns JWT with User info
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 */
const loginController = async (req, res, next) => {
  try {
    await loginValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await req.db.getUserByEmail(email);

    // Compare password
    const match = await user.comparePassword(password);
    if (match !== true) {
      throw new Error(errorMessages.AUTH_INCORRECT_PASSWORD);
    }

    // Remove password from user object.  Should this be abstracted to DB layer?
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    delete userWithoutPassword.avatarImage;

    // Happy path, return token
    const token = issueToken(userWithoutPassword);

    // reset avatar image
    userWithoutPassword.avatarImage = user.avatarImage;

    return res.status(200).json({
      success: true,
      msg: successMessages.AUTH_LOGIN_USER,
      data: { user: userWithoutPassword, token: token },
    });
  } catch (error) {
    error.status = 500;
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "loginController") : null;
    next(error);
  }
};

const userEditController = async (req, res, next) => {
  try {
    await editUserParamValidation.validateAsync(req.params);
    await editUserBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  // TODO is this neccessary any longer? Verify ownership middleware should handle this
  if (req.params.userId !== req.user._id.toString()) {
    const error = new Error(errorMessages.AUTH_UNAUTHORIZED);
    error.status = 401;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    // Change Password check
    if (req.body.password && req.body.newPassword) {
      const newPassword = req.body.newPassword;
      const password = req.body.password;

      // Compare password
      // Get token from headers
      const token = getTokenFromHeaders(req.headers);
      // Get email from token
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      // Add user email to body for DB operation
      req.body.email = email;
      // Get user
      const user = await req.db.getUserByEmail(email);
      // Compare passwords
      const match = await user.comparePassword(req.body.password);
      // If not a match, throw a 403
      if (!match) {
        const error = new Error(errorMessages.AUTH_INCORRECT_PASSWORD);
        error.status = 403;
        throw error;
      }
      // If a match, update the password
      req.body.password = req.body.newPassword;
    }

    const updatedUser = await req.db.updateUser(req, res);
    return res.status(200).json({
      success: true,
      msg: successMessages.AUTH_UPDATE_USER,
      data: updatedUser,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "userEditController") : null;
    next(error);
    return;
  }
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

    const inviteToken = await req.db.requestInviteToken(req, res);
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
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "inviteController") : null;
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
    const invite = await req.db.getInviteToken(req, res);
    res
      .status(200)
      .json({ status: "success", msg: "Invite verified", data: invite });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "inviteVerifyController")
      : null;
    next(error);
    return;
  }
};

/**
 * Checks to see if an admin account exists
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 */

const checkSuperadminController = async (req, res) => {
  try {
    const superAdminExists = await req.db.checkSuperadmin(req, res);
    return res.status(200).json({
      success: true,
      msg: successMessages.AUTH_ADMIN_EXISTS,
      data: superAdminExists,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "checkSuperadminController")
      : null;
    next(error);
    return;
  }
};

/**
 * Returns a recovery token
 * @async
 * @param {Express.Request} req
 * @property {Object} req.body
 * @property {string} req.body.email
 * @property {EmailService} req.body.emailService
 * @returns {Promise<Express.Response>}
 */
const recoveryRequestController = async (req, res, next) => {
  try {
    await recoveryValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const { email } = req.body;
    const user = await req.db.getUserByEmail(email);
    if (user) {
      const recoveryToken = await req.db.requestRecoveryToken(req, res);
      const name = user.firstName;
      const email = req.body.email;
      const url = `${process.env.CLIENT_HOST}/set-new-password/${recoveryToken.token}`;

      const msgId = await req.emailService.buildAndSendEmail(
        "passwordResetTemplate",
        { name, email, url },
        email,
        "Bluewaves Uptime Password Resest"
      );

      return res.status(200).json({
        success: true,
        msg: successMessages.AUTH_CREATE_RECOVERY_TOKEN,
        data: msgId,
      });
    }
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "recoveryRequestController")
      : null;
    next(error);
    return;
  }
};

/**
 * Returns a recovery token
 * @async
 * @param {Express.Request} req
 * @property {Object} req.body
 * @property {string} req.body.token
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 */
const validateRecoveryTokenController = async (req, res, next) => {
  try {
    await recoveryTokenValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    await req.db.validateRecoveryToken(req, res);
    // TODO Redirect user to reset password after validating token
    return res.status(200).json({
      success: true,
      msg: successMessages.AUTH_VERIFY_RECOVERY_TOKEN,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "validateRecoveryTokenController")
      : null;
    next(error);
    return;
  }
};

/**
 * Returns an updated user
 * @async
 * @param {Express.Request} req
 * @property {Object} req.body
 * @property {string} req.body.token
 * @property {string} req.body.password
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 */
const resetPasswordController = async (req, res, next) => {
  try {
    await newPasswordValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }
  try {
    const user = await req.db.resetPassword(req, res);
    const token = issueToken(user._doc);
    res.status(200).json({
      success: true,
      msg: successMessages.AUTH_RESET_PASSWORD,
      data: { user, token },
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "resetPasswordController")
      : null;
    next(error);
  }
};

/**
 * Deletes a user and all associated monitors, checks, and alerts.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with success status and message.
 * @throws {Error} If user validation fails or user is not found in the database.
 */
const deleteUserController = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req.headers);
    const decodedToken = jwt.decode(token);
    const { _id, email } = decodedToken;

    // Check if the user exists
    const user = await req.db.getUserByEmail(email);
    if (!user) {
      throw new Error(errorMessages.DB_USER_NOT_FOUND);
    }

    // 1. Find all the monitors associated with the team ID if superadmin

    const result = await req.db.getMonitorsByTeamId({
      params: { teamId: user.teamId },
    });
    if (user.role.includes("superadmin")) {
      //2.  Remove all jobs, delete checks and alerts
      result?.monitors.length > 0 &&
        (await Promise.all(
          result.monitors.map(async (monitor) => {
            await req.jobQueue.deleteJob(monitor);
            await req.db.deleteChecks(monitor._id);
            await req.db.deletePageSpeedChecksByMonitorId(monitor._id);
            await req.db.deleteNotificationsByMonitorId(monitor._id);
          })
        ));

      // 3. Delete team
      await req.db.deleteTeam(user.teamId);
      // 4. Delete all other team members
      await req.db.deleteAllOtherUsers();
      // 5. Delete each monitor
      await req.db.deleteMonitorsByUserId(user._id);
    }
    // 6. Delete the user by id
    await req.db.deleteUser(user._id);

    return res.status(200).json({
      success: true,
      msg: successMessages.AUTH_DELETE_USER,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "deleteUserController") : null;
    next(error);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await req.db.getAllUsers(req, res);
    res
      .status(200)
      .json({ success: true, msg: "Got all users", data: allUsers });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined
      ? (error.method = "getAllUsersController")
      : null;
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  userEditController,
  inviteController,
  inviteVerifyController,
  checkSuperadminController,
  recoveryRequestController,
  validateRecoveryTokenController,
  resetPasswordController,
  deleteUserController,
  getAllUsersController,
};
