import logger from "../utils/logger.js";
import { errorMessages } from "../utils/messages.js";

const handleErrors = (error, req, res, next) => {
	const status = error.status || 500;
	const message = error.message || errorMessages.FRIENDLY_ERROR;
	const service = error.service || errorMessages.UNKNOWN_SERVICE;
	logger.error(error.message, {
		service: service,
		method: error.method,
	});
	res.status(status).json({ success: false, msg: message });
};

export { handleErrors };
