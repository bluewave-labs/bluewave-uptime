import { Router } from "express";
import { resultsCallback } from "../controllers/distributedUptimeController.js";
const router = Router();

router.post("/distributed-uptime/results", resultsCallback);

export default router;
