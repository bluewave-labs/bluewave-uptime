const { Queue, Worker } = require("bullmq");
const logger = require("../utils/logger");
require("dotenv").config();

const connection = {
  host: process.env.BULL_MQ_HOST || "127.0.0.1",
  port: process.env.BULL_MQ_PORT || 6379,
};

const JOBS_PER_WORKER = 5;

let queue;
let workers = [];

const enqueueJob = async (queue, monitor) => {
  try {
    await queue.add(
      "monitors",
      { monitor },
      { delay: monitor.interval * 1000 }
    );
    logger.info("Job enqueued", { service: "pingService" });
  } catch (error) {
    logger.error(error.message, { service: "pingService" });
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
    logger.info("Worker created", { service: "pingService" });
    return worker;
  } catch (error) {
    logger.error(error.message, { service: "pingService" });
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
    logger.info("Cleaning up Ping Service...", { service: "pingService" });
    // Clean out the queue
    const jobs = await queue.getJobs(["active", "waiting", "delayed"]);
    for (const job of jobs) {
      await job.remove();
    }

    // Close workers
    for (const worker of workers) {
      await worker.close();
    }

    // Close the queue
    await queue.close();
    logger.info("Ping Service cleaned up", { service: "pingService" });
  } catch (error) {
    logger.error(error.message, { service: "pingService" });
  }
};

module.exports = { startPingService, cleanup };
