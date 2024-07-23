const PageSpeedCheck = require("../models/PageSpeedCheck");
const axios = require("axios");
const logger = require("../utils/logger");

class PageSpeedService {
  constructor() {
    this.SERVICE_NAME = "PageSpeedService";
  }

  async runPageSpeedCheck(url) {
    try {
      const response = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}`);
      return response.data;
    } catch (error) {
      logger.error(`Error running PageSpeed check for ${url}`, {
        service: this.SERVICE_NAME,
        error: error.message,
      });
      throw new Error("Failed to run PageSpeed check");
    }
  }

  async createPageSpeedCheck(data) {
    const newPageSpeedCheck = new PageSpeedCheck(data);
    return await newPageSpeedCheck.save();
  }
}

module.exports = PageSpeedService;
