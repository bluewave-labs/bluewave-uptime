import { handleError } from "./controllerUtils.js";
import { errorMessages, successMessages } from "../utils/messages.js";

const SERVICE_NAME = "JobQueueController";

const getMetrics = async (req, res, next) => {
	try {
		const metrics = await req.jobQueue.getMetrics();
		res.status(200).json({
			success: true,
			msg: successMessages.QUEUE_GET_METRICS,
			data: metrics,
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "getMetrics"));
		return;
	}
};

const getJobs = async (req, res, next) => {
	try {
		const jobs = await req.jobQueue.getJobStats();
		return res.status(200).json({
			success: true,
			msg: successMessages.QUEUE_GET_METRICS,
			data: jobs,
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "getJobs"));
		return;
	}
};

const addJob = async (req, res, next) => {
	try {
		await req.jobQueue.addJob(Math.random().toString(36).substring(7));
		return res.status(200).json({
			success: true,
			msg: successMessages.QUEUE_ADD_JOB,
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "addJob"));
		return;
	}
};

const obliterateQueue = async (req, res, next) => {
	try {
		await req.jobQueue.obliterate();
		return res.status(200).json({ success: true, msg: successMessages.QUEUE_OBLITERATE });
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "obliterateQueue"));
		return;
	}
};

export { getMetrics, getJobs, addJob, obliterateQueue };
