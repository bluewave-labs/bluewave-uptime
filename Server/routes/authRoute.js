const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const { verifySuperAdmin } = require("../middleware/verifySuperAdmin");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const multer = require("multer");
const upload = multer();
const User = require("../models/user");

const {
  registerController,
  loginController,
  logoutController,
  userEditController,
  recoveryRequestController,
  validateRecoveryTokenController,
  resetPasswordController,
  checkSuperadminController,
  getAllUsersController,
  deleteUserController,
  inviteController,
  inviteVerifyController,
} = require("../controllers/authController");

//Auth routes
router.post("/register", upload.single("profileImage"), registerController);
router.post("/login", loginController);
router.put(
  "/user/:userId",
  upload.single("profileImage"),
  verifyJWT,
  userEditController
);
router.get("/users/superadmin", checkSuperadminController);
router.get("/users", verifyJWT, verifySuperAdmin, getAllUsersController);
router.delete(
  "/user/:userId",
  verifyJWT,
  verifyOwnership(User, "userId"),
  deleteUserController
);

router.post("/invite", verifyJWT, inviteController);
router.post("/invite/verify", inviteVerifyController);

//Recovery routes
router.post("/recovery/request", recoveryRequestController);
router.post("/recovery/validate", validateRecoveryTokenController);
router.post("/recovery/reset/", resetPasswordController);

module.exports = router;
