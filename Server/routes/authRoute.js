const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const multer = require("multer");
const upload = multer();

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
router.post("/register", upload.single("profileImage"), registerController);
router.post("/login", loginController);
router.post(
  "/user/:userId",
  upload.single("profileImage"),
  verifyJWT,
  userEditController
);
router.get("/users/admin", checkAdminController);

//Recovery routes
router.post("/recovery/request", recoveryRequestController);
router.post("/recovery/validate", validateRecoveryTokenController);
router.post("/recovery/reset/", resetPasswordController);

module.exports = router;
