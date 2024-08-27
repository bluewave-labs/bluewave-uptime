const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const {
  inviteController,
  inviteVerifyController,
} = require("../controllers/inviteController");

router.post("/", verifyJWT, inviteController);
router.post("/verify", inviteVerifyController);

module.exports = router;
