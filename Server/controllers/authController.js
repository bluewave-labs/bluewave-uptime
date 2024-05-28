const express = require("express");
const {
  registerValidation,
  loginValidation,
  editUserParamValidation,
  editUserBodyValidation,
} = require("../validation/joi");
const logger = require("../utils/logger");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const SERVICE_NAME = "auth";

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

  // Check if the user exists
  try {
    const isUser = await req.db.getUserByEmail(req, res);
    if (isUser) {
      throw new Error("User already exists");
    }
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
    return;
  }

  // Create a new user
  try {
    const newUser = await req.db.insertUser(req, res);
    // TODO: Send an email to user
    // Will add this later
    logger.info("New user created!", {
      service: SERVICE_NAME,
      userId: newUser._id,
    });
    const token = issueToken(newUser._doc);

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
 * @throws {Error}
 */
const loginController = async (req, res, next) => {
  try {
    // Validate input
    await loginValidation.validateAsync(req.body);

    // Check if user exists
    const user = await req.db.getUserByEmail(req, res);

    // If user not found, throw an error
    if (!user) {
      throw new Error("User not found!");
    }
    // Compare password
    const match = await user.comparePassword(req.body.password);
    if (!match) {
      throw new Error("Password does not match!");
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
    res
      .status(200)
      .json({ success: true, msg: "User updated", data: updatedUser });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
    return;
  }
};

module.exports = { registerController, loginController, userEditController };
