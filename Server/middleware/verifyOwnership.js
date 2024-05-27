const logger = require("../utils/logger");
const SERVICE_NAME = "verifyOwnership";

const verifyOwnership = (Model, paramName) => {
  return async (req, res, next) => {
    const userId = req.user._id;
    const documentId = req.params[paramName];
    try {
      const doc = await Model.findById(documentId);
      //If the document is not found, return a 404 error
      if (!doc) {
        logger.error("Document not found", {
          service: SERVICE_NAME,
        });
        const error = new Error("Document not found");
        error.status = 404;
        throw error;
      }

      // If the userID does not match the document's userID, return a 403 error
      if (userId.toString() !== doc.userId.toString()) {
        const error = new Error("Unauthorized access");
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
