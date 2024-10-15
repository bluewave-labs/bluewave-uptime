import { Router } from "express";
import maintenanceWindowController from "../controllers/maintenanceWindowController.js";
import { verifyOwnership } from "../middleware/verifyOwnership.js";
import Monitor from "../db/models/Monitor.js";

const router = Router();

router.post("/", maintenanceWindowController.createMaintenanceWindows);

router.get(
  "/monitor/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  maintenanceWindowController.getMaintenanceWindowsByMonitorId
);

router.get("/team/", maintenanceWindowController.getMaintenanceWindowsByTeamId);

router.get("/:id", maintenanceWindowController.getMaintenanceWindowById);

router.put("/:id", maintenanceWindowController.editMaintenanceWindow);

router.delete("/:id", maintenanceWindowController.deleteMaintenanceWindow);

export default router;
