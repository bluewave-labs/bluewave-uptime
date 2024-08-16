const router = require("express").Router();
const queueController = require("../controllers/queueController");

router.get("/metrics", queueController.getMetrics);

// Get Jobs
router.get("/", queueController.getJobs);

// Add Job
router.post("/", queueController.addJob);

// Obliterate Queue
router.post("/obliterate", queueController.obliterateQueue);

module.exports = router;
