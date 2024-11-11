import StatusPage from "../../models/StatusPage.js";
import { errorMessages } from "../../../utils/messages.js";

const SERVICE_NAME = "statusPageModule";

const createStatusPage = async (statusPageData) => {
	try {
		const isUnique = await urlIsUnique(statusPageData.url);
		if (!isUnique) {
			const error = new Error(errorMessages.STATUS_PAGE_URL_NOT_UNIQUE);
			error.status = 400;
			throw error;
		}
		const statusPage = new StatusPage({ ...statusPageData });
		await statusPage.save();
		return statusPage;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "createStatusPage";
		throw error;
	}
};

const getStatusPageByUrl = async (url) => {
	try {
		const statusPage = await StatusPage.findOne({ url });
		if (statusPage === null || statusPage === undefined) {
			const error = new Error(errorMessages.STATUS_PAGE_NOT_FOUND);
			error.status = 404;

			throw error;
		}
		return statusPage;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "getStatusPageByUrl";
		throw error;
	}
};

const urlIsUnique = async (url) => {
	try {
		const statusPage = await StatusPage.find({ url });
		if (statusPage.length > 0) return false;
		return true;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "urlIsUnique";
		throw error;
	}
};

export { createStatusPage, getStatusPageByUrl, urlIsUnique };
