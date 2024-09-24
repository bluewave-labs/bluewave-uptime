const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const { isAllowed } = require("../middleware/isAllowed");

const {
  inviteController,
  inviteVerifyController,
} = require("../controllers/inviteController");

router.post(
  "/",
  isAllowed(["admin", "superadmin"]),
  verifyJWT,
  inviteController
);
router.post("/verify", inviteVerifyController);

module.exports = router;
