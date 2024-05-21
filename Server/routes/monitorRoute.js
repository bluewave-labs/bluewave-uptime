const router = require("express").Router();
const monitorController = require("../controllers/monitorController");

router.get("/", monitorController.getAllMonitors);
router.get("/:monitorId", monitorController.getMonitorById);
router.get("/user/:userId", monitorController.getMonitorsByUserId);

router.post("/", monitorController.createMonitor);
router.post("/delete/:monitorId", monitorController.deleteMonitor);
router.post("/edit/:monitorId", monitorController.editMonitor);
module.exports = router;
