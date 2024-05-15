const express = require("express");
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
      logger.warning("User already exists!", {
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
    return res.json({ success: true, msg: "User created}", data: newUser });
  } catch (error) {
    logger.error(error.message, { service: "auth" });
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { registerController };
