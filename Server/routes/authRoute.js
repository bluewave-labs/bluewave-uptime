const router = require("express").Router();
const { verifyJWT } = require("../middleware/verifyJWT");

const {
  registerController,
  loginController,
  userEditController,
} = require("../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/user/:userId", verifyJWT, userEditController);

module.exports = router;
