const {
  getMonitorsByIdValidation,
  getMonitorsByUserIdValidation,
} = require("../validation/joi");
const db = require("../db/FakeDb");

// Gets all monitors
const getAllMonitors = async (req, res) => {
  try {
    const monitors = await db.getAllMonitors();
    return res.json({ success: true, msg: "Monitors found", data: monitors });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// Get a monitor by ID
const getMonitorById = async (req, res) => {
  const { error } = getMonitorsByIdValidation.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  }

  try {
    const monitorId = req.params.monitorId;
    const monitor = await db.getMonitorById(monitorId);
    return res.json({ success: true, msg: "Monitor found", data: monitor });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// Gets a monitor by user ID
const getMonitorsByUserId = async (req, res) => {
  const { error } = getMonitorsByUserIdValidation.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  }

  try {
    const userId = req.params.userId;
    const monitors = await db.getMonitorsByUserId(userId);
    return res.json({
      success: true,
      msg: `Monitors for user ${userId} found`,
      data: monitors,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { getAllMonitors, getMonitorById, getMonitorsByUserId };
