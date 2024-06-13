const express = require("express");
const {
  registerValidation,
  loginValidation,
  editUserParamValidation,
  editUserBodyValidation,
  recoveryValidation,
  recoveryTokenValidation,
  newPasswordValidation,
} = require("../validation/joi");
const logger = require("../utils/logger");
require("dotenv").config();
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
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "99d" });
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

  // Create a new user
  try {
    const newUser = await req.db.insertUser(req, res);
    logger.info("New user created!", {
      service: SERVICE_NAME,
      userId: newUser._id,
    });
    const token = issueToken(newUser._doc);

    // Sending email to user with pre defined template
    const template = registerTemplate("https://www.bluewavelabs.ca");
    await sendEmail(
      [newUser.email],
      "Welcome to Uptime Monitor",
      template,
      "Registered."
    );

    return res
      .status(200)
      .json({ success: true, msg: "User created", data: token });
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
      throw new Error("Incorrect password");
    }

    // Remove password from user object.  Should this be abstracted to DB layer?
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    // Happy path, return token
    const token = issueToken(userWithoutPassword);
    return res
      .status(200)
      .json({ success: true, msg: "Found user", data: token });
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

  if (req.params.userId !== req.user._id.toString()) {
    const error = new Error("Unauthorized access");
    error.status = 401;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  try {
    const updatedUser = await req.db.updateUser(req, res);
    return res
      .status(200)
      .json({ success: true, msg: "User updated", data: updatedUser });
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
        msg: "Created recovery token",
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
      msg: "Token is valid",
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
    res.status(200).json({ success: true, msg: "Password reset", data: user });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};
module.exports = {
  registerController,
  loginController,
  userEditController,
  recoveryRequestController,
  validateRecoveryTokenController,
  resetPasswordController,
};
