const { Queue, Worker } = require("bullmq");
const logger = require("../utils/logger");
require("dotenv").config();

const connection = {
  host: process.env.BULL_MQ_HOST || "127.0.0.1",
  port: process.env.BULL_MQ_PORT || 6379,
};

const JOBS_PER_WORKER = 5;

const SERVICE_NAME = "pingService";

let queue;
let workers = [];

const enqueueJob = async (queue, monitor) => {
  try {
    await queue.add(
      "monitors",
      { monitor },
      { delay: monitor.interval * 1000 }
    );
    logger.info("Job enqueued", { service: SERVICE_NAME });
  } catch (error) {
    logger.error(error.message, { service: SERVICE_NAME });
  }
};

const pingMonitor = (monitor) => {
  console.log(`{url: ${monitor.url},`, `interval: ${monitor.interval}}`);
};

const createWorker = (queue) => {
  try {
    const worker = new Worker(
      "monitors",
      async (job) => {
        //Ping the monitor and enqueue the job again to constantly monitor
        pingMonitor(job.data.monitor);
        enqueueJob(queue, job.data.monitor);
      },
      {
        connection,
      }
    );
    logger.info("Worker created", { service: SERVICE_NAME });
    return worker;
  } catch (error) {
    logger.error(error.message, { service: SERVICE_NAME });
  }
};

const startPingService = async (db) => {
  queue = new Queue("monitors", {
    connection,
  });

  const monitors = await db.getAllMonitors();

  for (let i = 0; i < monitors.length; i++) {
    if (i % JOBS_PER_WORKER === 0) workers.push(createWorker(queue));
    enqueueJob(queue, monitors[i]);
  }

  // Make sure a worker was created, none will be created if jobs < JOBS_PER_WORKER
  if (workers.length === 0) workers.push(createWorker(queue));
};

const cleanup = async () => {
  try {
    logger.info("Cleaning up Ping Service...", { service: SERVICE_NAME });

    // Clean out the queue
    const jobs = await queue.getJobs(["active", "waiting", "delayed"]);
    await Promise.all(jobs.map((job) => job.remove()));

    // Close workers
    await Promise.all(workers.map((worker) => worker.close()));

    // Close the queue
    await queue.close();
    logger.info("Ping Service cleaned up", { service: SERVICE_NAME });
  } catch (error) {
    logger.error(error.message, { service: SERVICE_NAME });
  }
};

module.exports = { startPingService, cleanup };
