import { Router } from "express";
import {
	getMetrics,
	getJobs,
	addJob,
	obliterateQueue,
} from "../controllers/queueController.js";

const router = Router();
router.get("/metrics", getMetrics);

// Get Jobs
router.get("/jobs", getJobs);

// Add Job
router.post("/jobs", addJob);

// Obliterate Queue
router.post("/obliterate", obliterateQueue);

export default router;
