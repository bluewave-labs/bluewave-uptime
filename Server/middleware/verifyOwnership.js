const logger = require("../utils/logger");
const SERVICE_NAME = "verifyOwnership";
const { errorMessages } = require("../utils/messages");

const verifyOwnership = (Model, paramName) => {
  return async (req, res, next) => {
    const userId = req.user._id;
    const documentId = req.params[paramName];
    try {
      const doc = await Model.findById(documentId);
      //If the document is not found, return a 404 error
      if (!doc) {
        logger.error(errorMessages.VERIFY_OWNER_NOT_FOUND, {
          service: SERVICE_NAME,
        });
        const error = new Error(errorMessages.VERIFY_OWNER_NOT_FOUND);
        error.status = 404;
        throw error;
      }

      // If the userID does not match the document's userID, return a 403 error
      if (userId.toString() !== doc.userId.toString()) {
        console.log("boom");
        const error = new Error(errorMessages.VERIFY_OWNER_UNAUTHORIZED);
        error.status = 403;
        throw error;
      }
      next();
    } catch (error) {
      error.service = SERVICE_NAME;
      next(error);
    }
  };
};

module.exports = { verifyOwnership };
