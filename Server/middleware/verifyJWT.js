const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const SERVICE_NAME = "verifyJWT";
const TOKEN_PREFIX = "Bearer ";

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
    logger.error("No token provided", { service: SERVICE_NAME });
    return res.status(401).json({ success: false, msg: "No token provided" });
  }
  // Make sure it is properly formatted
  if (token.startsWith(TOKEN_PREFIX)) {
    const parsedToken = token.slice(TOKEN_PREFIX.length, token.length);
    // Verify the token's authenticity
    jwt.verify(parsedToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        logger.error("Invalid token", { service: SERVICE_NAME });
        return res.status(401).json({ success: false, msg: "Invalid token" });
      }
      //Add the user to the request object for use in the route
      req.user = decoded;
      next();
    });
  } else {
    logger.error("Invalid token format", { service: SERVICE_NAME });
    return res
      .status(400)
      .json({ success: false, msg: "Invalid token format" });
  }
};

module.exports = { verifyJWT };
