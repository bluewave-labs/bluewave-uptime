const { Queue, Worker } = require("bullmq");
const logger = require("../utils/logger");
require("dotenv").config();

const connection = {
  host: process.env.BULL_MQ_HOST,
  port: process.env.BULL_MQ_PORT,
};

const JOBS_PER_WORKER = 5;

let queue;
let workers = [];

const enqueueJob = async (queue, monitor) => {
  await queue.add("monitors", { monitor }, { delay: monitor.interval * 1000 });
};

const pingMonitor = (monitor) => {
  console.log(`{url: ${monitor.url},`, `interval: ${monitor.interval}}`);
};

const createWorker = (queue) => {
  return new Worker(
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
    console.log("Cleaning up queue...");
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
  } catch (error) {
    logger.error(error.message, { service: "pingService" });
  }
};

module.exports = { startPingService, cleanup };
