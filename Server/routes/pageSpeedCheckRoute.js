const router = require("express").Router();
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../models/Monitor");
const checkController = require("../controllers/pageSpeedCheckController");

/**
 * @route POST /pagespeed/:monitorId
 * @description Create a new PageSpeedCheck for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 */
router.post(
  "/pagespeed/:monitorId",
  verifyOwnership(Monitor, "monitorId"), 
  checkController.createPageSpeedCheck
);

/**
 * @route GET /pagespeed/:monitorId
 * @description Get all PageSpeedChecks for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 */
router.get(
  "/pagespeed/:monitorId",
  verifyOwnership(Monitor, "monitorId"), 
  checkController.getPageSpeedChecks
);

/**
 * @route DELETE /pagespeed/:monitorId
 * @description Delete all PageSpeedChecks for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 */
router.delete(
  "/pagespeed/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.deletePageSpeedCheck
);

module.exports = router;
