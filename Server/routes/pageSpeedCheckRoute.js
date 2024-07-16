const router = require("express").Router();
const pageSpeedCheckController = require("../controllers/pageSpeedCheckController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const PageSpeedCheck = require("../models/PageSpeedCheck");

/**
 * @route POST /:monitorId
 * @description Create a new PageSpeedCheck for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 * @controller pageSpeedCheckController.createCheck
 */
router.post(
  "/:monitorId",
  verifyOwnership(PageSpeedCheck, "monitorId"),
  pageSpeedCheckController.createCheck
);

/**
 * @route GET /:monitorId
 * @description Get all PageSpeedChecks for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 * @controller pageSpeedCheckController.getChecks
 */
router.get(
  "/:monitorId",
  verifyOwnership(PageSpeedCheck, "monitorId"),
  pageSpeedCheckController.getChecks
);

/**
 * @route POST /delete/:monitorId
 * @description Delete all PageSpeedChecks for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 * @controller pageSpeedCheckController.deleteChecks
 */
router.post(
  "/delete/:monitorId",
  verifyOwnership(PageSpeedCheck, "monitorId"),
  pageSpeedCheckController.deleteChecks
);

module.exports = router;
