const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");

const {
  registerController,
  loginController,
  userEditController,
  recoveryRequestController,
  validateRecoveryTokenController,
  resetPasswordController,
  deleteUserController
} = require("../controllers/authController");

//Auth routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/user/:userId", verifyJWT, userEditController);

//Recovery routes
router.post("/recovery/request", recoveryRequestController);
router.post("/recovery/validate", validateRecoveryTokenController);
router.post("/recovery/reset/", resetPasswordController);

//Delete routes
router.delete("/delete/:userId", deleteUserController);

module.exports = router;
