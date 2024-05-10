const { getMonitorsByIdValidation } = require("../validation/joi");

const getAllMonitors = async (req, res) => {
  res.json({ message: "Hello from Monitor Controller" });
};

const getMonitorById = async (req, res) => {
  const { error } = getMonitorsByIdValidation.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  }

  const monitorId = req.params.monitorId;
  return res.json({ success: true, msg: "Monitor found", data: { monitorId } });
};

module.exports = { getAllMonitors, getMonitorById };
