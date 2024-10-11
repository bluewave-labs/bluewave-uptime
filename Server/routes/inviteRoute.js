const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const { isAllowed } = require("../middleware/isAllowed");

const {
  issueInvitation,
  inviteVerifyController,
} = require("../controllers/inviteController");

router.post(
  "/",
  isAllowed(["admin", "superadmin"]),
  verifyJWT,
  issueInvitation
);
router.post("/verify", issueInvitation);

module.exports = router;
