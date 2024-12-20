import { Router } from "express";
import { resultsCallback } from "../controllers/distributedUptimeController.js";
const router = Router();

router.post("/results", resultsCallback);

export default router;
