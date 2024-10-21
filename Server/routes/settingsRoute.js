import { Router } from "express";
import { getAppSettings, updateAppSettings } from "../controllers/settingsController.js";
import { isAllowed } from "../middleware/isAllowed.js";

const router = Router();

router.get("/", getAppSettings);
router.put("/", isAllowed(["superadmin"]), updateAppSettings);

export default router;
