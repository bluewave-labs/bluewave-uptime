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
  "/:userId",
  maintenanceWindowController.getMaintenanceWindowsByUserId
);

module.exports = router;
