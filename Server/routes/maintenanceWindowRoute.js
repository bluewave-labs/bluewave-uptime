const router = require("express").Router();
const maintenanceWindowController = require("../controllers/maintenanceWindowController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../db/models/Monitor");

router.post("/", maintenanceWindowController.createMaintenanceWindows);

router.get(
  "/monitor/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  maintenanceWindowController.getMaintenanceWindowsByMonitorId
);

router.get("/team/", maintenanceWindowController.getMaintenanceWindowsByTeamId);

router.delete("/:id", maintenanceWindowController.deleteMaintenanceWindow);

module.exports = router;
