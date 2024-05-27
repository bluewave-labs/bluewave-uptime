const router = require("express").Router();
const user = require("../models/user");
const { verifyJWT } = require("../middleware/verifyJWT");
const { verifyOwnership } = require("../middleware/verifyOwnership");

const {
  registerController,
  loginController,
  userEditController,
} = require("../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/user/:userId", verifyJWT, userEditController);

module.exports = router;
