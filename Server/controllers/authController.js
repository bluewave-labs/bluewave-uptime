const express = require('express')
const UserModel = require('../models/user')
const { authValidation } = require('../validation/joi')

/**
 * @function
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns {{success: Boolean, msg: String}}
 */
const registerController = async (req, res) => {
    // joi validation
    const { error } = await authValidation.validateAsync(req.body);
    if (error) return res.status(400).json({ success: false, msg: error.details[0].message });

    // Check if the user exists
    const isUser = await UserModel.findOne({ email: req.body.email });
    if (isUser) return res.status(400).json({ success: false, msg: "User already exists!" })

    try {
        // Create a new user
        const newUser = await UserModel.create({ ...req.body });

        // Send an email to user
        // Will add this later
    } catch (error) {
        return res.status(500).json({success:false,msg:'Something went wrong!'})
    }

}

module.exports = {registerController}