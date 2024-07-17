const router = require("express").Router();
const Joi = require("joi");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../models/Monitor");
const { createPageSpeedCheck, getPageSpeedChecks, deletePageSpeedCheck } = require("../controllers/pageSpeedCheckController");
const { getMonitorByIdValidation } = require("../validation/joi"); 

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
  async (req, res, next) => {
    try {
      // Validate monitorId parameter
      const { error } = getMonitorByIdValidation.validate(req.params);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      next();
    } catch (error) {
      next(error);
    }
  },
  createPageSpeedCheck 
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
  async (req, res, next) => {
    try {
      // Validate monitorId parameter
      const { error } = getMonitorByIdValidation.validate(req.params);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      next();
    } catch (error) {
      next(error);
    }
  },
  getPageSpeedChecks 
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
  async (req, res, next) => {
    try {
      // Validate monitorId parameter
      const { error } = getMonitorByIdValidation.validate(req.params);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      next();
    } catch (error) {
      next(error);
    }
  },
  deletePageSpeedCheck 
);

module.exports = router;
