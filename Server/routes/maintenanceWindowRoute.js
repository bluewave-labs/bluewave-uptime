import { Router } from "express";
import {
	createMaintenanceWindows,
	getMaintenanceWindowById,
	getMaintenanceWindowsByTeamId,
	getMaintenanceWindowsByMonitorId,
	deleteMaintenanceWindow,
	editMaintenanceWindow,
} from "../controllers/maintenanceWindowController.js";
import { verifyOwnership } from "../middleware/verifyOwnership.js";
import Monitor from "../db/models/Monitor.js";

const router = Router();

router.post("/", createMaintenanceWindows);

router.get(
	"/monitor/:monitorId",
	verifyOwnership(Monitor, "monitorId"),
	getMaintenanceWindowsByMonitorId
);

router.get("/team/", getMaintenanceWindowsByTeamId);

router.get("/:id", getMaintenanceWindowById);

router.put("/:id", editMaintenanceWindow);

router.delete("/:id", deleteMaintenanceWindow);

export default router;
