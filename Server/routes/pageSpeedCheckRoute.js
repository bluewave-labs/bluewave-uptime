const router = require("express").Router();
const { verifyOwnership } = require("../middleware/verifyOwnership");
const PageSpeedCheck = require("../models/PageSpeedCheck");

/**
 * @route POST /:monitorId
 * @description Create a new PageSpeedCheck for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 */
router.post(
  "/:monitorId",
  verifyOwnership(PageSpeedCheck, "monitorId"),
  () => {
    console.log("Create check");
  }
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
  verifyOwnership(PageSpeedCheck, "monitorId"),
  () => {
    console.log("Get checks");
  }
);

/**
 * @route POST /delete/:monitorId
 * @description Delete all PageSpeedChecks for a monitor
 * @access Private
 * @param {string} monitorId - The ID of the monitor
 * @middleware verifyOwnership - Ensures the user owns the monitor
 */
router.post(
  "/delete/:monitorId",
  verifyOwnership(PageSpeedCheck, "monitorId"),
  () => {
    console.log("Delete checks");
  }
);

module.exports = router;
