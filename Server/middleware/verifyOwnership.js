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
        return res
          .status(404)
          .json({ success: false, msg: "Document not found" });
      }

      // If the userID does not match the document's userID, return a 403 error
      if (userId.toString() !== doc.userId.toString()) {
        logger.error("Unauthorized access", {
          service: SERVICE_NAME,
        });

        return res.status(403).json({
          success: false,
          msg: "You are not authorized to perform this action",
        });
      }
      next();
    } catch (error) {
      logger.error(error.message, {
        service: SERVICE_NAME,
      });
      return res.status(500).json({ success: false, msg: error.message });
    }
  };
};

module.exports = { verifyOwnership };
