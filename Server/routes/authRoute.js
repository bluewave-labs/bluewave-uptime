const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");

const {
  registerController,
  loginController,
  userEditController,
  recoveryRequestController,
} = require("../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/user/:userId", verifyJWT, userEditController);

//Recovery routes

router.post("/recovery/request", recoveryRequestController);

module.exports = router;
