const SERVICE_NAME = "distributedUptimeController";

import { handleValidationError, handleError } from "./controllerUtils.js";

const resultsCallback = async (req, res, next) => {
	try {
		console.log(req.body);
		res.status(200).json({ message: "OK" });
	} catch (error) {
		throw handleError(error, SERVICE_NAME, "resultsCallback");
	}
};

export { resultsCallback };
