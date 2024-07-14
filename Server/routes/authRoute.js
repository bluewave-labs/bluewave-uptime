const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const multer = require("multer");
const upload = multer();
const User = require("../models/user");

const {
  registerController,
  loginController,
  userEditController,
  recoveryRequestController,
  validateRecoveryTokenController,
  resetPasswordController,
  checkAdminController,
  deleteUserController
} = require("../controllers/authController");

//Auth routes
router.post("/register", upload.single("profileImage"), registerController);
router.post("/login", loginController);
router.post(
  "/user/:userId",
  upload.single("profileImage"),
  verifyJWT,
  userEditController
);
router.get("/users/admin", checkAdminController);
router.delete("/user/:userId", verifyJWT, verifyOwnership(User, "userId") , deleteUserController);

//Recovery routes
router.post("/recovery/request", recoveryRequestController);
router.post("/recovery/validate", validateRecoveryTokenController);
router.post("/recovery/reset/", resetPasswordController);

module.exports = router;
