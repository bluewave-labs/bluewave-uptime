const router = require("express").Router();
const checkController = require("../controllers/checkController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const Monitor = require("../models/Monitor");

router.post(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.createCheck
);

router.get("/:monitorId", checkController.getChecks);

router.get("/team/:teamId", checkController.getTeamChecks);

router.delete(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.deleteChecks
);

module.exports = router;
