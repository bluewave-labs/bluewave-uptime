const router = require("express").Router();
const alertController = require("../controllers/alertController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Alert = require("../models/Alert");

// Create alert
router.post("/:monitorId", alertController.createAlert);
// Get all alerts for a user
router.get("/user/:userId", alertController.getAlertsByUserId);
// Get all alerts for a monitor
router.get("/monitor/:monitorId", alertController.getAlertsByMonitorId);
// Get a single alert
router.get("/:alertId", alertController.getAlertById);
// Edit
router.post(
  "/edit/:alertId",
  verifyOwnership(Alert, "alertId"),
  alertController.editAlert
);
//Delete
router.post(
  "/delete/:alertId",
  verifyOwnership(Alert, "alertId"),
  alertController.deleteAlert
);

module.exports = router;
