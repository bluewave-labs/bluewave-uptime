import {
	createCheckParamValidation,
	createCheckBodyValidation,
	getChecksParamValidation,
	getChecksQueryValidation,
	getTeamChecksParamValidation,
	getTeamChecksQueryValidation,
	deleteChecksParamValidation,
	deleteChecksByTeamIdParamValidation,
	updateChecksTTLBodyValidation,
} from "../validation/joi.js";
import { successMessages } from "../utils/messages.js";
import jwt from "jsonwebtoken";
import { getTokenFromHeaders } from "../utils/utils.js";
import { handleValidationError, handleError } from "./controllerUtils.js";

const SERVICE_NAME = "checkController";

const createCheck = async (req, res, next) => {
	try {
		await createCheckParamValidation.validateAsync(req.params);
		await createCheckBodyValidation.validateAsync(req.body);
	} catch (error) {
		next(handleValidationError(error, SERVICE_NAME));
		return;
	}

	try {
		const checkData = { ...req.body };
		const check = await req.db.createCheck(checkData);
		return res
			.status(200)
			.json({ success: true, msg: successMessages.CHECK_CREATE, data: check });
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "createCheck"));
	}
};

const getChecks = async (req, res, next) => {
	try {
		await getChecksParamValidation.validateAsync(req.params);
		await getChecksQueryValidation.validateAsync(req.query);
	} catch (error) {
		next(handleValidationError(error, SERVICE_NAME));
		return;
	}

	try {
		const checks = await req.db.getChecks(req);
		const checksCount = await req.db.getChecksCount(req);
		return res.status(200).json({
			success: true,
			msg: successMessages.CHECK_GET,
			data: { checksCount, checks },
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "getChecks"));
	}
};

const getTeamChecks = async (req, res, next) => {
	try {
		await getTeamChecksParamValidation.validateAsync(req.params);
		await getTeamChecksQueryValidation.validateAsync(req.query);
	} catch (error) {
		next(handleValidationError(error, SERVICE_NAME));
		return;
	}
	try {
		const checkData = await req.db.getTeamChecks(req);
		return res.status(200).json({
			success: true,
			msg: successMessages.CHECK_GET,
			data: checkData,
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "getTeamChecks"));
	}
};

const deleteChecks = async (req, res, next) => {
	try {
		await deleteChecksParamValidation.validateAsync(req.params);
	} catch (error) {
		next(handleValidationError(error, SERVICE_NAME));
		return;
	}

	try {
		const deletedCount = await req.db.deleteChecks(req.params.monitorId);
		return res.status(200).json({
			success: true,
			msg: successMessages.CHECK_DELETE,
			data: { deletedCount },
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "deleteChecks"));
	}
};

const deleteChecksByTeamId = async (req, res, next) => {
	try {
		await deleteChecksByTeamIdParamValidation.validateAsync(req.params);
	} catch (error) {
		next(handleValidationError(error, SERVICE_NAME));
		return;
	}

	try {
		const deletedCount = await req.db.deleteChecksByTeamId(req.params.teamId);
		return res.status(200).json({
			success: true,
			msg: successMessages.CHECK_DELETE,
			data: { deletedCount },
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "deleteChecksByTeamId"));
	}
};

const updateChecksTTL = async (req, res, next) => {
	const SECONDS_PER_DAY = 86400;

	try {
		await updateChecksTTLBodyValidation.validateAsync(req.body);
	} catch (error) {
		next(handleValidationError(error, SERVICE_NAME));
		return;
	}

	try {
		// Get user's teamId
		const token = getTokenFromHeaders(req.headers);
		const { jwtSecret } = req.settingsService.getSettings();
		const { teamId } = jwt.verify(token, jwtSecret);
		const ttl = parseInt(req.body.ttl, 10) * SECONDS_PER_DAY;
		await req.db.updateChecksTTL(teamId, ttl);
		return res.status(200).json({
			success: true,
			msg: successMessages.CHECK_UPDATE_TTL,
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "updateTTL"));
	}
};

export {
	createCheck,
	getChecks,
	getTeamChecks,
	deleteChecks,
	deleteChecksByTeamId,
	updateChecksTTL,
};
