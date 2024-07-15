const express = require("express");
const {
  registerValidation,
  loginValidation,
  editUserParamValidation,
  editUserBodyValidation,
  recoveryValidation,
  recoveryTokenValidation,
  newPasswordValidation,
  deleteUserParamValidation,
} = require("../validation/joi");
const logger = require("../utils/logger");
require("dotenv").config();
const { errorMessages, successMessages } = require("../utils/messages");
var jwt = require("jsonwebtoken");
const SERVICE_NAME = "auth";
const { sendEmail } = require("../utils/sendEmail");
const {
  registerTemplate,
} = require("../utils/emailTemplates/registerTemplate");

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

const getTokenFromHeaders = (headers) => {
  const authorizationHeader = headers.authorization;
  if (!authorizationHeader) throw new Error("No auth headers");

  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    throw new Error("Invalid auth headers");

  return parts[1];
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
    await registerValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message = error.details[0].message;
    next(error);
    return;
  }

  // Check if an admin user exists, if so, error
  try {
    const admin = await req.db.checkAdmin(req, res);
    console.log(admin);
    if (admin === true) {
      throw new Error(errorMessages.AUTH_ADMIN_EXISTS);
    }
  } catch (error) {
    console.log("WEEEEEEE", error.message);
    error.service = SERVICE_NAME;
    error.status = 403;
    next(error);
    return;
  }

  // Create a new user
  try {
    const newUser = await req.db.insertUser(req, res);
    logger.info(successMessages.AUTH_CREATE_USER, {
      service: SERVICE_NAME,
      userId: newUser._id,
    });

    const userForToken = { ...newUser._doc };
    delete userForToken.profileImage;
    delete userForToken.avatarImage;

    const token = issueToken(userForToken);

    // Sending email to user with pre defined template
    const template = registerTemplate("https://www.bluewavelabs.ca");
    await sendEmail(
      [newUser.email],
      "Welcome to Uptime Monitor",
      template,
      "Registered."
    );

    return res.status(200).json({
      success: true,
      msg: successMessages.AUTH_CREATE_USER,
      data: { user: newUser, token: token },
    });
  } catch (error) {
    error.service = SERVICE_NAME;
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
    // Validate input
    await loginValidation.validateAsync(req.body);

    // Check if user exists
    const user = await req.db.getUserByEmail(req, res);

    // Compare password

    const match = await user.comparePassword(req.body.password);
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
    // Anything else should be an error
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
    error.message = error.details[0].message;
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
      const user = await req.db.getUserByEmail(req, res);
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
    error.service = SERVICE_NAME;
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

const checkAdminController = async (req, res) => {
  try {
    const adminExists = await req.db.checkAdmin(req, res);
    return res.status(200).json({
      success: true,
      msg: successMessages.AUTH_ADMIN_EXISTS,
      data: adminExists,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
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
 * @param {Express.Response} res
 * @returns {Promise<Express.Response>}
 */
const recoveryRequestController = async (req, res, next) => {
  try {
    await recoveryValidation.validateAsync(req.body);
    const user = await req.db.getUserByEmail(req, res);
    if (user) {
      const recoveryToken = await req.db.requestRecoveryToken(req, res);
      await sendEmail(
        [req.body.email],
        "Uptime Monitor Password Recovery",
        `<a clicktracking="off" href='${process.env.CLIENT_HOST}/set-new-password/${recoveryToken.token}'>Click here to reset your password</a>`,
        `Recovery token: ${recoveryToken.token}`
      );
      return res.status(200).json({
        success: true,
        msg: successMessages.AUTH_CREATE_RECOVERY_TOKEN,
      });
    }
    // TODO Email token to user
  } catch (error) {
    error.service = SERVICE_NAME;
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
    await req.db.validateRecoveryToken(req, res);
    // TODO Redirect user to reset password after validating token
    return res.status(200).json({
      success: true,
      msg: successMessages.AUTH_VERIFY_RECOVERY_TOKEN,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
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
    user = await req.db.resetPassword(req, res);
    res.status(200).json({
      success: true,
      msg: successMessages.AUTH_RESET_PASSWORD,
      data: user,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
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

    const decodedTokenCastedAsRequest = {
      params: {
        userId: _id,
      },
      body: {
        email,
      },
    };

    // Validate user
    await deleteUserParamValidation.validateAsync(
      decodedTokenCastedAsRequest.body
    );

    // Check if the user exists
    const user = await req.db.getUserByEmail(decodedTokenCastedAsRequest);
    if (!user) {
      throw new Error(errorMessages.DB_USER_NOT_FOUND);
    }

    // 1. Find all the monitors associated with the user id
    const monitors = await req.db.getMonitorsByUserId(
      decodedTokenCastedAsRequest
    );

    if (monitors) {
      // 2. Delete jobs associated with each monitor
      for (const monitor of monitors) {
        await req.jobQueue.deleteJob(monitor);
      }

      // 3. Delete all checks associated with each monitor
      for (const monitor of monitors) {
        await req.db.deleteChecks(monitor._id);
      }

      // 4. Delete all alerts associated with each monitor
      for (const monitor of monitors) {
        await req.db.deleteAlertByMonitorId(monitor._id);
      }

      // 5. Delete each monitor
      await req.db.deleteMonitorsByUserId(user._id);

      // 6. Delete the user by id
      await req.db.deleteUser(decodedTokenCastedAsRequest);

      return res.status(200).json({
        success: true,
        msg: successMessages.AUTH_DELETE_USER,
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: errorMessages.MONITOR_GET_BY_USER_ID,
      });
    }
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  userEditController,
  checkAdminController,
  recoveryRequestController,
  validateRecoveryTokenController,
  resetPasswordController,
  deleteUserController,
};
