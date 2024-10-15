import { Router } from "express";
import monitorController from "../controllers/monitorController.js";
import { isAllowed } from "../middleware/isAllowed.js";

const router = Router();

router.get("/", monitorController.getAllMonitors);
router.get("/stats/:monitorId", monitorController.getMonitorStatsById);
router.get("/certificate/:monitorId", monitorController.getMonitorCertificate);
router.get("/:monitorId", monitorController.getMonitorById);
router.get(
  "/team/summary/:teamId",
  monitorController.getMonitorsAndSummaryByTeamId
);
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
  "/",
  isAllowed(["superadmin"]),
  monitorController.deleteAllMonitors
);

router.post(
  "/pause/:monitorId",
  isAllowed(["admin", "superadmin"]),
  monitorController.pauseMonitor
);

router.post(
  "/demo",
  isAllowed(["admin", "superadmin"]),
  monitorController.addDemoMonitors
);

export default router;
