const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const SERVICE_NAME = "verifyJWT";
const TOKEN_PREFIX = "Bearer ";
const { errorMessages } = require("../utils/messages");
const { parse } = require("path");
const User = require("../models/user");
/**
 * Verifies the JWT token
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {express.Response}
 */
const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  // Make sure a token is provided
  if (!token) {
    const error = new Error(errorMessages.NO_AUTH_TOKEN);
    error.status = 401;
    error.service = SERVICE_NAME;
    next(error);
    return;
  }
  // Make sure it is properly formatted
  if (!token.startsWith(TOKEN_PREFIX)) {
    const error = new Error(errorMessages.INVALID_AUTH_TOKEN); // Instantiate a new Error object for improperly formatted token
    error.status = 400;
    error.service = SERVICE_NAME;
    error.method = "verifyJWT";
    next(error);
    return;
  }

  const parsedToken = token.slice(TOKEN_PREFIX.length, token.length);
  // Verify the token's authenticity
  jwt.verify(parsedToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, msg: errorMessages.INVALID_AUTH_TOKEN });
    }
    //Add the user to the request object for use in the route
    req.user = decoded;
    next();
  });
};

module.exports = { verifyJWT };
