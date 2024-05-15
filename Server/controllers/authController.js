const express = require("express");
const UserModel = require("../models/user");
const { authValidation } = require("../validation/joi");

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {{success: Boolean, msg: String}}
 */
const registerController = async (req, res) => {
  // joi validation
  try {
    await authValidation.validateAsync(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  }

  // Check if the user exists
  try {
    const isUser = await req.db.getUserByEmail(req, res);
    if (isUser)
      return res
        .status(400)
        .json({ success: false, msg: "User already exists!" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }

  try {
    // Create a new user
    const newUser = await req.db.insertUser(req, res);
    return res.json({ success: true, msg: "User created}", data: newUser });
    // Send an email to user
    // Will add this later
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { registerController };
