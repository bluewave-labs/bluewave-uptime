import { Router } from "express";
import {
  getAllMonitors,
  getMonitorStatsById,
  getMonitorCertificate,
  getMonitorById,
  getMonitorsAndSummaryByTeamId,
  getMonitorsByTeamId,
  createMonitor,
  checkEndpointResolution,
  deleteMonitor,
  deleteAllMonitors,
  editMonitor,
  pauseMonitor,
  addDemoMonitors,
} from "../controllers/monitorController.js";
import { isAllowed } from "../middleware/isAllowed.js";
import { fetchMonitorCertificate } from "../controllers/controllerUtils.js";

const router = Router();

router.get("/", getAllMonitors);
router.get("/stats/:monitorId", getMonitorStatsById);
router.get("/certificate/:monitorId", (req, res, next) => {
  getMonitorCertificate(req, res, next, fetchMonitorCertificate);
});
router.get("/:monitorId", getMonitorById);
router.get("/team/summary/:teamId", getMonitorsAndSummaryByTeamId);
router.get("/team/:teamId", getMonitorsByTeamId);

router.get(
  "/resolution/url",
  isAllowed(["admin", "superadmin"]),
  checkEndpointResolution
)

router.delete(
  "/:monitorId",
  isAllowed(["admin", "superadmin"]),
  deleteMonitor
);

router.post("/", isAllowed(["admin", "superadmin"]), createMonitor);

router.put("/:monitorId", isAllowed(["admin", "superadmin"]), editMonitor);

router.delete("/", isAllowed(["superadmin"]), deleteAllMonitors);

router.post("/pause/:monitorId", isAllowed(["admin", "superadmin"]), pauseMonitor);

router.post("/demo", isAllowed(["admin", "superadmin"]), addDemoMonitors);

export default router;
