const router = require("express").Router();
const maintenanceWindowController = require("../controllers/maintenanceWindowController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../models/Monitor");

router.post(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  maintenanceWindowController.createMaintenanceWindow
);

router.get(
  "/user/:userId",
  maintenanceWindowController.getMaintenanceWindowsByUserId
);

router.get(
  "/monitor/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  maintenanceWindowController.getMaintenanceWindowsByMonitorId
);

module.exports = router;
