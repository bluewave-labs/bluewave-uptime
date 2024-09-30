const router = require("express").Router();
const settingsController = require("../controllers/settingsController");
const { isAllowed } = require("../middleware/isAllowed");
const Monitor = require("../models/Monitor");

router.get("/", settingsController.getAppSettings);
router.put(
  "/",
  isAllowed(["superadmin"]),
  settingsController.updateAppSettings
);

module.exports = router;
