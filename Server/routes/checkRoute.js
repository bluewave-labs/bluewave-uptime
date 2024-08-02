const router = require("express").Router();
const Check = require("../models/Check");
const Monitor = require("../models/Monitor");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const { verifyJWT } = require("../middleware/verifyJWT");
const checkController = require("../controllers/checkController");

router.use(verifyJWT);

router.post(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.createCheck
);

router.get(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.getChecks
);

router.post(
  "/delete/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.deleteChecks
);

// Temporary test route
router.post("/test-notification/:monitorId", async (req, res) => {
  try {
    const monitorId = req.params.monitorId;
    const monitor = await Monitor.findById(monitorId);
    if (!monitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

    const newCheck = new Check({
      monitorId,
      status: false, 
      responseTime: 100,
      statusCode: 500,
      message: "Server error"
    });

    await newCheck.save();
    res.status(201).json({ message: "Check created and email notification sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
