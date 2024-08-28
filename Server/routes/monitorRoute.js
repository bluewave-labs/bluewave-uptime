const router = require("express").Router();
const monitorController = require("../controllers/monitorController");
const { isAllowed } = require("../middleware/isAllowed");

router.get("/", monitorController.getAllMonitors);
router.get("/stats/:monitorId", monitorController.getMonitorStatsById);
router.get("/certificate/:monitorId", monitorController.getMonitorCertificate);
router.get("/:monitorId", monitorController.getMonitorById);
router.get("/team/:teamId", monitorController.getMonitorsByTeamId);

router.post(
  "/",
  isAllowed(["admin", "superadmin"]),
  monitorController.createMonitor
);

router.delete(
  "/:monitorId",
  isAllowed(["admin", "superadmin"]),
  monitorController.deleteMonitor
);

router.put(
  "/:monitorId",
  isAllowed(["admin", "superadmin"]),
  monitorController.editMonitor
);

router.delete(
  "/all",
  isAllowed(["superadmin"]),
  monitorController.deleteAllMonitors
);
module.exports = router;
