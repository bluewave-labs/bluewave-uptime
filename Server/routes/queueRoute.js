import { Router } from "express";
import queueController from "../controllers/queueController.js";

const router = Router();
router.get("/metrics", queueController.getMetrics);

// Get Jobs
router.get("/jobs", queueController.getJobs);

// Add Job
router.post("/jobs", queueController.addJob);

// Obliterate Queue
router.post("/obliterate", queueController.obliterateQueue);

export default router;
