const {
  createCheckParamValidation,
  createCheckBodyValidation,
  getChecksParamValidation,
  getChecksQueryValidation,
  getTeamChecksParamValidation,
  getTeamChecksQueryValidation,
  deleteChecksParamValidation,
  deleteChecksByTeamIdParamValidation,
  updateChecksTTLBodyValidation,
} = require("../validation/joi");
const { successMessages } = require("../utils/messages");
const jwt = require("jsonwebtoken");
const { getTokenFromHeaders } = require("../utils/utils");
const SERVICE_NAME = "checkController";

const createCheck = async (req, res, next) => {
  try {
    await createCheckParamValidation.validateAsync(req.params);
    await createCheckBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const checkData = { ...req.body };
    const check = await req.db.createCheck(checkData);
    return res
      .status(200)
      .json({ success: true, msg: successMessages.CHECK_CREATE, data: check });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "createCheck") : null;
    next(error);
  }
};

const getChecks = async (req, res, next) => {
  try {
    await getChecksParamValidation.validateAsync(req.params);
    await getChecksQueryValidation.validateAsync(req.query);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const checks = await req.db.getChecks(req);
    const checksCount = await req.db.getChecksCount(req);
    return res.status(200).json({
      success: true,
      msg: successMessages.CHECK_GET,
      data: { checksCount, checks },
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "getChecks") : null;
    next(error);
  }
};

const getTeamChecks = async (req, res, next) => {
  try {
    await getTeamChecksParamValidation.validateAsync(req.params);
    await getTeamChecksQueryValidation.validateAsync(req.query);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }
  try {
    const checkData = await req.db.getTeamChecks(req);
    return res.status(200).json({
      success: true,
      msg: successMessages.CHECK_GET,
      data: checkData,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "getTeamChecks") : null;
    next(error);
  }
};

const deleteChecks = async (req, res, next) => {
  try {
    await deleteChecksParamValidation.validateAsync(req.params);
  } catch (error) {
    error.status = 422;
    error.service = SERVICE_NAME;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    const deletedCount = await req.db.deleteChecks(req.params.monitorId);
    return res.status(200).json({
      success: true,
      msg: successMessages.CHECK_DELETE,
      data: { deletedCount },
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "deleteChecks") : null;
    next(error);
  }
};

const deleteChecksByTeamId = async (req, res, next) => {
  try {
    await deleteChecksByTeamIdParamValidation.validateAsync(req.params);
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "deleteChecksByTeam") : null;
    error.status = 422;
    next(error);
    return;
  }

  try {
    const deletedCount = await req.db.deleteChecksByTeamId(req.params.teamId);
    return res.status(200).json({
      success: true,
      msg: successMessages.CHECK_DELETE,
      data: { deletedCount },
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "deleteChecksByTeamId") : null;
    next(error);
  }
};

const updateChecksTTL = async (req, res, next) => {
  const SECONDS_PER_DAY = 86400;

  try {
    await updateChecksTTLBodyValidation.validateAsync(req.body);
  } catch (error) {
    error.status = 422;
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "updateChecksTTL") : null;
    error.message =
      error.details?.[0]?.message || error.message || "Validation Error";
    next(error);
    return;
  }

  try {
    // Get user's teamId
    const token = getTokenFromHeaders(req.headers);
    const { teamId } = jwt.verify(token, process.env.JWT_SECRET);
    const ttl = parseInt(req.body.ttl, 10) * SECONDS_PER_DAY;
    await req.db.updateChecksTTL(teamId, ttl);
    return res.status(200).json({
      success: true,
      msg: successMessages.CHECK_UPDATE_TTL,
    });
  } catch (error) {
    error.service === undefined ? (error.service = SERVICE_NAME) : null;
    error.method === undefined ? (error.method = "updateTTL") : null;
    next(error);
  }
};

module.exports = {
  createCheck,
  getChecks,
  getTeamChecks,
  deleteChecks,
  deleteChecksByTeamId,
  updateChecksTTL,
};
