const axios = require("axios");
const ping = require("ping");
const logger = require("../utils/logger");

class NetworkService {
  constructor(db) {
    this.db = db;
    this.TYPE_PING = "ping";
    this.TYPE_HTTP = "http";
    this.SERVICE_NAME = "NetworkService";
  }

  async handlePing(job) {
    const startTime = Date.now();
    try {
      const response = await ping.promise.probe(job.data.url);
      const isAlive = response.alive;
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      await this.logAndStoreCheck(job, isAlive, responseTime);
      return isAlive;
    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      await this.logAndStoreCheck(job, false, responseTime, error);
      return false;
    }
  }

  async handleHttp(job) {
    try {
      const startTime = Date.now();
      const response = await axios.get(job.data.url);
      const isAlive = response.status >= 200 && response.status < 300;
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      await this.logAndStoreCheck(job, isAlive, responseTime);
      return isAlive;
    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      await this.logAndStoreCheck(job, false, responseTime, error);
      return false;
    }
  }

  async getStatus(job) {
    switch (job.data.type) {
      case this.TYPE_PING:
        return await this.handlePing(job);
      case this.TYPE_HTTP:
        return await this.handleHttp(job);
      default:
        console.error(`Unsupported type: ${job.data.type}`, {
          service: this.SERVICE_NAME,
          timestamp: new Date().toISOString(),
        });
        return false;
    }
  }

  async logAndStoreCheck(job, isAlive, responseTime, error = null) {
    const status = isAlive ? "alive" : "dead";
    if (error) {
      logger.error(`Error processing job ${job.id}: ${error.message}`, {
        service: this.SERVICE_NAME,
        jobId: job.id,
        error: error,
      });
      return;
    }

    if (isAlive) {
      console.log(
        `Job ${job.data.url} is alive, response time: ${responseTime}ms`
      );
      return;
    }

    if (!isAlive) {
      console.log(`Job ${job.data.url} is dead`);
      return;
    }
  }
}

module.exports = NetworkService;
