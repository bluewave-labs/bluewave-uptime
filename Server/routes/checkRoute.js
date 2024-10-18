import { Router } from "express";
import {
	createCheck,
	getChecks,
	deleteChecks,
	getTeamChecks,
	deleteChecksByTeamId,
	updateChecksTTL,
} from "../controllers/checkController.js";
import { verifyOwnership } from "../middleware/verifyOwnership.js";
import { isAllowed } from "../middleware/isAllowed.js";
import Monitor from "../db/models/Monitor.js";

const router = Router();

router.get("/:monitorId", getChecks);
router.post("/:monitorId", verifyOwnership(Monitor, "monitorId"), createCheck);
router.delete("/:monitorId", verifyOwnership(Monitor, "monitorId"), deleteChecks);

router.get("/team/:teamId", getTeamChecks);

router.delete("/team/:teamId", isAllowed(["admin", "superadmin"]), deleteChecksByTeamId);

router.put("/team/ttl", isAllowed(["admin", "superadmin"]), updateChecksTTL);

export default router;
