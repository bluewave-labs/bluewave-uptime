import { Router } from "express";
import settingsController from "../controllers/settingsController.js";
import { isAllowed } from "../middleware/isAllowed.js";

const router = Router();

router.get("/", settingsController.getAppSettings);
router.put(
  "/",
  isAllowed(["superadmin"]),
  settingsController.updateAppSettings
);

export default router;
