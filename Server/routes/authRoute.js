const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");

const {
  registerController,
  loginController,
  userEditController,
  recoveryRequestController,
  validateRecoveryTokenController,
  resetPasswordController,
  checkAdminController,
} = require("../controllers/authController");

//Auth routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/user/:userId", verifyJWT, userEditController);
router.get("/users/admin", checkAdminController);

//Recovery routes
router.post("/recovery/request", recoveryRequestController);
router.post("/recovery/validate", validateRecoveryTokenController);
router.post("/recovery/reset/", resetPasswordController);

module.exports = router;
