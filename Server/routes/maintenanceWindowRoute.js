const router = require("express").Router();
const maintenanceWindowController = require("../controllers/maintenanceWindowController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../models/Monitor");

router.get(
  "/monitor/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  maintenanceWindowController.getMaintenanceWindowsByMonitorId
);

router.post(
  "/monitor/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  maintenanceWindowController.createMaintenanceWindow
);

router.get(
  "/user/:userId",
  maintenanceWindowController.getMaintenanceWindowsByUserId
);

module.exports = router;
