const PageSpeedService = require("../service/pageSpeedService");
const { successMessages } = require("../utils/messages");
const pageSpeedService = new PageSpeedService();
const SERVICE_NAME = "pagespeed";
const {
  getPageSpeedCheckParamValidation,
  createPageSpeedCheckParamValidation,
  createPageSpeedCheckBodyValidation,
  deletePageSpeedCheckParamValidation,
} = require("../validation/joi");

/**
 * Gets all PageSpeedChecks for a monitor
 * @async
 * @param {Express.Request} req - The request object
 * @param {Express.Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<Express.Response>}
 */
const getPageSpeedChecks = async (req, res, next) => {
  try {
    // Validate monitorId parameter
    await getPageSpeedCheckParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    return res.status(200).json({ msg: "Hit getPageSpeedChecks" });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

/**
 * Creates a new PageSpeedCheck for a monitor
 * @async
 * @param {Express.Request} req - The request object
 * @param {Express.Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<Express.Response>}
 */
const createPageSpeedCheck = async (req, res, next) => {
  try {
    await createPageSpeedCheckParamValidation.validateAsync(req.params);
    await createPageSpeedCheckBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const { monitorId } = req.params;
    const { url } = req.body;

    // Run the PageSpeed check
    const pageSpeedResults = await pageSpeedService.runPageSpeedCheck(url);

    // Extract categories scores
    const categories = pageSpeedResults.lighthouseResult?.categories;

    if (!categories) {
      throw new Error("Categories not found in PageSpeed results");
    }

    const newPageSpeedCheck = await pageSpeedService.createPageSpeedCheck({
      monitorId,
      accessibility: (categories.accessibility?.score || 0) * 100,
      bestPractices: (categories["best-practices"]?.score || 0) * 100,
      seo: (categories.seo?.score || 0) * 100,
      performance: (categories.performance?.score || 0) * 100,
    });

    return res.status(201).json({
      msg: successMessages.CREATED,
      data: newPageSpeedCheck,
    });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

/**
 * Deletes all PageSpeedChecks for a monitor
 * @async
 * @param {Express.Request} req - The request object
 * @param {Express.Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<Express.Response>}
 */
const deletePageSpeedCheck = async (req, res, next) => {
  try {
    // Validate monitorId parameter
    await deletePageSpeedCheckParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }
  try {
    return res.status(200).json({ msg: "Hit deletePageSpeedCheck" });
  } catch (error) {
    error.service = SERVICE_NAME;
    next(error);
  }
};

module.exports = {
  getPageSpeedChecks,
  createPageSpeedCheck,
  deletePageSpeedCheck,
};
