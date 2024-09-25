const router = require("express").Router();
const checkController = require("../controllers/checkController");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const { isAllowed } = require("../middleware/isAllowed");
const Monitor = require("../models/Monitor");

router.get("/:monitorId", checkController.getChecks);
router.post(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.createCheck
);
router.delete(
  "/:monitorId",
  verifyOwnership(Monitor, "monitorId"),
  checkController.deleteChecks
);

router.get("/team/:teamId", checkController.getTeamChecks);

router.delete(
  "/team/:teamId",
  isAllowed(["admin", "superadmin"]),
  checkController.deleteChecksByTeamId
);

router.put(
  "/team/ttl",
  isAllowed(["admin", "superadmin"]),
  checkController.updateChecksTTL
);

module.exports = router;
