const router = require("express").Router();
const monitorController = require("../controllers/monitorController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../models/Monitor");

router.get("/", monitorController.getAllMonitors);
router.get("/:monitorId", monitorController.getMonitorById);
router.get("/user/:userId", monitorController.getMonitorsByUserId);

router.get(
  "/incidents/:monitorId",
  monitorController.getMonitorByIdForIncidents
);
router.get(
  "/incidents/user/:userId",
  monitorController.getMonitorsByUserIdForIncidents
);

router.post("/", monitorController.createMonitor);
router.post(
  "/delete/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  monitorController.deleteMonitor
);
router.post(
  "/edit/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  monitorController.editMonitor
);

router.delete("/delete/all", monitorController.deleteAllMonitors);
module.exports = router;
