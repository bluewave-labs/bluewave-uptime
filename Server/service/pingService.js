const { Queue, Worker } = require("bullmq");
const logger = require("../utils/logger");
require("dotenv").config();

const connection = {
  host: process.env.BULL_MQ_HOST || "127.0.0.1",
  port: process.env.BULL_MQ_PORT || 6379,
};

const JOBS_PER_WORKER = 5;
const MAX_CREATE_WORKER_RETRIES = 3;

const SERVICE_NAME = "pingService";
const QUEUE_NAME = "monitors";

let queue;
let workers = [];

const enqueueJob = async (queue, monitor) => {
  try {
    await queue.add(
      QUEUE_NAME,
      { monitor },
      { delay: monitor.interval * 1000 }
    );
    logger.info("Job enqueued", { service: SERVICE_NAME });
  } catch (error) {
    logger.error(error.message, { service: SERVICE_NAME });
  }
};

const pingMonitor = (monitor) => {
  // TODO Implement pinging the monitor
  console.log(`{url: ${monitor.url},`, `interval: ${monitor.interval}}`);
};

const createWorker = (queue, retries = 0) => {
  try {
    const worker = new Worker(
      QUEUE_NAME,
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
    // If creating a worker fails, recursively retry MAX_CREATE_WORKER_RETRIES times
    if (retries < MAX_CREATE_WORKER_RETRIES) {
      logger.info(
        `Retrying to create worker (${
          retries + 1
        }/${MAX_CREATE_WORKER_RETRIES})`,
        { service: SERVICE_NAME }
      );
      return createWorker(queue, retries + 1);
    }

    return null;
  }
};

const startPingService = async (db) => {
  queue = new Queue(QUEUE_NAME, {
    connection,
  });

  const monitors = await db.getAllMonitors();

  for (let i = 0; i < monitors.length; i++) {
    if (i % JOBS_PER_WORKER === 0) {
      const worker = createWorker(queue);
      worker && workers.push(worker);
    }
    enqueueJob(queue, monitors[i]);
  }

  // Make sure a worker was created, none will be created if jobs < JOBS_PER_WORKER
  if (workers.length === 0) {
    const worker = createWorker(queue);
    worker && workers.push(worker);
    if (!worker) {
      logger.error("Failed to create workers", { service: SERVICE_NAME });
    }
  }
};

const cleanup = async () => {
  try {
    logger.info("Cleaning up Ping Service...", { service: SERVICE_NAME });

    // Clean out the queue
    const jobs = await queue.getJobs(["active", "waiting", "delayed"]);
    // There could be a great many jobs, handle this asynchronously with Promise.all
    await Promise.all(jobs.map((job) => job.remove()));

    // Close workers.  Same as jobs, there could be many workers we don't want to wait for each one to close.
    await Promise.all(workers.map((worker) => worker.close()));

    // Close the queue
    await queue.close();
    logger.info("Ping Service cleaned up", { service: SERVICE_NAME });
  } catch (error) {
    logger.error(error.message, { service: SERVICE_NAME });
  }
};

module.exports = { startPingService, cleanup };
