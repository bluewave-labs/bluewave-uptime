const router = require("express").Router();
const pageSpeedCheckController = require("../controllers/pageSpeedCheckController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const PageSpeedCheck = require("../models/PageSpeedCheck");

router.post(
  "/:monitorId",
  verifyOwnership(PageSpeedCheck, "monitorId"),
  pageSpeedCheckController.createCheck
);

router.get(
  "/:monitorId",
  verifyOwnership(PageSpeedCheck, "monitorId"),
  pageSpeedCheckController.getChecks
);

router.post(
  "/delete/:monitorId",
  verifyOwnership(PageSpeedCheck, "monitorId"),
  pageSpeedCheckController.deleteChecks
);

module.exports = router;
