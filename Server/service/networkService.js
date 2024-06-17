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
    try {
      const response = await ping.promise.probe(job.data.url);
      const isAlive = response.alive;
      await this.logAndStoreCheck(job, isAlive);
      return isAlive;
    } catch (error) {
      await this.logAndStoreCheck(job, false, error);
      return false;
    }
  }

  async handleHttp(job) {
    try {
      const response = await axios.get(job.data.url);
      const isAlive = response.status >= 200 && response.status < 300;
      await this.logAndStoreCheck(job, isAlive);
      return isAlive;
    } catch (error) {
      await this.logAndStoreCheck(job, false, error);
      return false;
    }
  }

  async getStatus(job) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async logAndStoreCheck(job, isAlive, error = null) {
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
      console.log(`Job ${job.data.url} is alive`);
      return;
    }

    if (!isAlive) {
      console.log(`Job ${job.data.url} is dead`);
      return;
    }
  }
}

module.exports = NetworkService;
