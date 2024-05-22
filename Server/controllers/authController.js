const express = require("express");
const { registerValidation, loginValidation } = require("../validation/joi");
const logger = require("../utils/logger");
require("dotenv").config();
var jwt = require("jsonwebtoken");

/**
 * Creates and returns JWT token with an arbitrary payload
 * @function
 * @param {Object} payload
 * @returns {String}
 */
const issueToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {{success: Boolean, msg: String}}
 */
const registerController = async (req, res) => {
  // joi validation
  try {
    await registerValidation.validateAsync(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  }

  // Check if the user exists
  try {
    const isUser = await req.db.getUserByEmail(req, res);
    if (isUser) {
      logger.error("User already exists!", {
        service: "auth",
        userId: isUser._id,
      });
      return res
        .status(400)
        .json({ success: false, msg: "User already exists!" });
    }
  } catch (error) {
    logger.error(error.message, { service: "auth" });
    return res.status(500).json({ success: false, msg: error.message });
  }

  try {
    // Create a new user
    const newUser = await req.db.insertUser(req, res);
    // TODO: Send an email to user
    // Will add this later
    logger.info("New user created!", { service: "auth", userId: newUser._id });
    const token = issueToken(newUser);

    return res
      .status(200)
      .json({ success: true, msg: "User created", data: token });
  } catch (error) {
    logger.error(error.message, { service: "auth" });
    return res.status(500).json({ success: false, msg: error.message });
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
const loginController = async (req, res) => {
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
    // Anything else should be an error
    logger.error(error.message, { service: "auth" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { registerController, loginController };
