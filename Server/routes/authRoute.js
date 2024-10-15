const router = require("express").Router();
const { verifyJWT, verifyRefreshToken } = require("../middleware/verifyJWT");
const { verifyOwnership } = require("../middleware/verifyOwnership");
const { isAllowed } = require("../middleware/isAllowed");
const multer = require("multer");
const upload = multer();
const User = require("../db/models/User");

const {
  registerUser,
  loginUser,
  refreshJwtToken,
  editUser,
  requestRecovery,
  validateRecovery,
  resetPassword,
  checkSuperadminExists,
  getAllUsers,
  deleteUser,
} = require("../controllers/authController");

//Auth routes
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.post("/refresh", verifyRefreshToken, refreshJwtToken);
router.put(
  "/user/:userId",
  upload.single("profileImage"),
  verifyJWT,
  editUser
);
router.get("/users/superadmin", checkSuperadminExists);
router.get(
  "/users",
  verifyJWT,
  isAllowed(["admin", "superadmin"]),
  getAllUsers
);
router.delete(
  "/user/:userId",
  verifyJWT,
  verifyOwnership(User, "userId"),
  deleteUser
);

//Recovery routes
router.post("/recovery/request", requestRecovery);
router.post("/recovery/validate", validateRecovery);
router.post("/recovery/reset/", resetPassword);

module.exports = router;
