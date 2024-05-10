const router = require("express").Router();
const monitorController = require("../controllers/monitorController");
const { getMonitorsByIdValidation } = require("../validation/joi");

router.get("/", monitorController.getAllMonitors);
router.get("/:monitorId", monitorController.getMonitorById);

module.exports = router;
