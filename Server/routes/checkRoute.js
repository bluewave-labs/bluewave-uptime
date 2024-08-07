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

module.exports = router;
