const router = require("express").Router();
const alertController = require("../controllers/alertController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Alert = require("../models/Alert");
const Monitor = require("../models/Monitor");

// Create alert
router.post(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  alertController.createAlert
);
// Get all alerts for a user
router.get(
  "/user/:userId",
  verifyOwnership(Monitor, "monitorId"),
  alertController.getAlertsByUserId
);
// Get all alerts for a monitor
router.get(
  "/monitor/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  alertController.getAlertsByMonitorId
);
// Get a single alert
router.get(
  "/:alertId",
  verifyOwnership(Monitor, "monitorId"),
  alertController.getAlertById
);
// Edit
router.post(
  "/edit/:alertId",
  verifyOwnership(Monitor, "monitorId"),
  alertController.editAlert
);
//Delete
router.post(
  "/delete/:alertId",
  verifyOwnership(Monitor, "monitorId"),
  alertController.deleteAlert
);

module.exports = router;
