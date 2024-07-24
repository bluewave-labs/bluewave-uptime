const router = require("express").Router();
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../models/Monitor");
const checkController = require("../controllers/pageSpeedCheckController");

/**
 * @route POST /:monitorId
 * @description Create a new PageSpeedCheck for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 */
router.post(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"), 
  checkController.createPageSpeedCheck
);

/**
 * @route GET /:monitorId
 * @description Get all PageSpeedChecks for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 */
router.get(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"), 
  checkController.getPageSpeedChecks
);

/**
 * @route DELETE /:monitorId
 * @description Delete all PageSpeedChecks for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 */
router.delete(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.deletePageSpeedCheck
);

module.exports = router;

