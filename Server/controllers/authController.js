const express = require("express");
const UserModel = require("../models/user");
const { registerValidation, loginValidation } = require("../validation/joi");
const logger = require("../utils/logger");

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
    return res
      .status(200)
      .json({ success: true, msg: "User created}", data: newUser });
  } catch (error) {
    logger.error(error.message, { service: "auth" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// **************************
// Handles logging in a user
// Returns a user at the moment, but will likely return a JWT in the future
// **************************
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
    console.log(user);
    if (!match) {
      throw new Error("Password does not match!");
    }

    // Copy user to remove password.  More memory, but better than mutating user?
    // We can move this to the DB layer if we want
    // Probably not neccessary at all as we'll likely return a JWT instead of a user
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    // Happy path, return user
    // In the future we'll probably return a JWT instead of a user
    return res
      .status(200)
      .json({ success: true, msg: "Found user", data: userWithoutPassword });
  } catch (error) {
    // Anything else should be an error
    logger.error(error.message, { service: "auth" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { registerController, loginController };
