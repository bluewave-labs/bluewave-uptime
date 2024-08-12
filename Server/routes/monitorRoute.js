const router = require("express").Router();
const monitorController = require("../controllers/monitorController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../models/Monitor");

router.get("/", monitorController.getAllMonitors);
router.get("/stats/:monitorId", monitorController.getMonitorStatsById);
router.get("/certificate/:monitorId", monitorController.getMonitorCertificate);
router.get("/:monitorId", monitorController.getMonitorById);
router.get("/user/:userId", monitorController.getMonitorsByUserId);

router.post("/", monitorController.createMonitor);
router.delete(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  monitorController.deleteMonitor
);
router.put(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  monitorController.editMonitor
);

router.delete("/all", monitorController.deleteAllMonitors);
module.exports = router;
