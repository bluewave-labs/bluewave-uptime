const router = require("express").Router();
const queueController = require("../controllers/queueController");

router.get("/metrics", queueController.getMetrics);

// Get Jobs
router.get("/jobs", queueController.getJobs);

// Add Job
router.post("/jobs", queueController.addJob);

// Obliterate Queue
router.post("/obliterate", queueController.obliterateQueue);

module.exports = router;
