const router = require("express").Router();
const settingsController = require("../controllers/settingsController");
const { isAllowed } = require("../middleware/isAllowed");
const Monitor = require("../models/Monitor");

router.get("/", isAllowed(["superadmin"]), settingsController.getAppSettings);

module.exports = router;
