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

  async measureResponseTime(operation) {
    const startTime = Date.now();
    try {
      const response = await operation();
      const endTime = Date.now();
      return { responseTime: endTime - startTime, response };
    } catch (error) {
      throw error;
    }
  }

  async handlePing(job) {
    const operation = async () => {
      const response = await ping.promise.probe(job.data.url);
      return response;
    };

    try {
      const { responseTime, response } = await this.measureResponseTime(
        operation
      );
      const isAlive = response.alive;
      await this.logAndStoreCheck(job, isAlive, responseTime);
      return isAlive;
    } catch (error) {
      await this.logAndStoreCheck(job, false, 0, error);
      return false;
    }
  }

  async handleHttp(job) {
    const operation = async () => {
      const response = await axios.get(job.data.url);
      return response;
    };
    try {
      const { responseTime, response } = await this.measureResponseTime(
        operation
      );
      const isAlive = response.status >= 200 && response.status < 300;
      await this.logAndStoreCheck(job, isAlive, responseTime);
      return isAlive;
    } catch (error) {
      await this.logAndStoreCheck(job, false, 0, error);
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
      console.log(`Job ${job.data.url} is dead`);
      return;
    }

    if (isAlive) {
      console.log(
        `Job ${job.data.url} is alive, response time: ${responseTime}ms`
      );
      return;
    }

    console.log(`Job ${job.data.url} is dead`);
    return;
  }
}

module.exports = NetworkService;
