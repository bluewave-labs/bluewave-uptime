const { handleError } = require("./controllerUtils");
const { errorMessages, successMessages } = require("../utils/messages");
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
    return res
      .status(200)
      .json({
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
    return res.send("Added job");
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "addJob"));
    return;
  }
};

const obliterateQueue = async (req, res, next) => {
  try {
    await req.jobQueue.obliterate();
    return res.status(200).send("Obliterated queue");
  } catch (error) {
    next(handleError(error, SERVICE_NAME, "obliterateQueue"));
    return;
  }
};

module.exports = {
  getMetrics,
  getJobs,
  addJob,
  obliterateQueue,
};
