import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyOwnership } from "../middleware/verifyOwnership.js";
import { isAllowed } from "../middleware/isAllowed.js";
import multer from "multer";
import User from "../db/models/User.js";

const router = Router();
const upload = multer();

import {
	registerUser,
	loginUser,
  refreshAuthToken,
	editUser,
	requestRecovery,
	validateRecovery,
	resetPassword,
	checkSuperadminExists,
	getAllUsers,
	deleteUser,
} from "../controllers/authController.js";

//Auth routes
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAuthToken);
router.put("/user/:userId", upload.single("profileImage"), verifyJWT, editUser);
router.get("/users/superadmin", checkSuperadminExists);
router.get("/users", verifyJWT, isAllowed(["admin", "superadmin"]), getAllUsers);
router.delete("/user/:userId", verifyJWT, verifyOwnership(User, "userId"), deleteUser);

//Recovery routes
router.post("/recovery/request", requestRecovery);
router.post("/recovery/validate", validateRecovery);
router.post("/recovery/reset/", resetPassword);

export default router;
