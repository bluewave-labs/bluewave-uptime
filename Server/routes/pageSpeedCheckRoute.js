const router = require("express").Router();
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../models/Monitor");

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
  verifyOwnership(Monitor, "monitorId"),
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
  verifyOwnership(Monitor, "monitorId"),
  () => {
    console.log("Delete checks");
  }
);

module.exports = router;
