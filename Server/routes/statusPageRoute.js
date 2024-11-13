import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
	createStatusPage,
	getStatusPageByUrl,
} from "../controllers/statusPageController.js";
const router = express.Router();

router.get("/:url", getStatusPageByUrl);
router.post("/:url", verifyJWT, createStatusPage);
export default router;
