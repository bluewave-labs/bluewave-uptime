import { Router } from "express";
import checkController from "../controllers/checkController.js";
import { verifyOwnership } from "../middleware/verifyOwnership.js";
import { isAllowed } from "../middleware/isAllowed.js";
import Monitor from "../db/models/Monitor.js";

const router = Router();

router.get("/:monitorId", checkController.getChecks);
router.post(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.createCheck
);
router.delete(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.deleteChecks
);

router.get("/team/:teamId", checkController.getTeamChecks);

router.delete(
  "/team/:teamId",
  isAllowed(["admin", "superadmin"]),
  checkController.deleteChecksByTeamId
);

router.put(
  "/team/ttl",
  isAllowed(["admin", "superadmin"]),
  checkController.updateChecksTTL
);

export default router;
