import { handleError, handleValidationError } from "./controllerUtils.js";
import {
	createStatusPageBodyValidation,
	getStatusPageParamValidation,
} from "../validation/joi.js";
import { successMessages } from "../utils/messages.js";

const SERVICE_NAME = "statusPageController";

const createStatusPage = async (req, res, next) => {
	try {
		await createStatusPageBodyValidation.validateAsync(req.body);
	} catch (error) {
		next(handleValidationError(error, SERVICE_NAME));
		return;
	}

	try {
		const statusPage = await req.db.createStatusPage(req.body);
		return res.status(200).json({
			success: true,
			msg: successMessages.STATUS_PAGE_CREATE,
			data: statusPage,
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "createStatusPage"));
	}
};

const getStatusPageByUrl = async (req, res, next) => {
	try {
		await getStatusPageParamValidation.validateAsync(req.params);
	} catch (error) {
		next(handleValidationError(error, SERVICE_NAME));
		return;
	}

	try {
		const { url } = req.params;
		const statusPage = await req.db.getStatusPageByUrl(url);
		return res.status(200).json({
			success: true,
			msg: successMessages.STATUS_PAGE_BY_URL,
			data: statusPage,
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "getStatusPage"));
	}
};

export { createStatusPage, getStatusPageByUrl };
