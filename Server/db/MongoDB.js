const Monitor = require("../models/Monitor");
const mongoose = require("mongoose");
const UserModel = require("../models/user");
const Check = require("../models/Check");

const verifyId = (userId, monitorId) => {
  return userId.toString() === monitorId.toString();
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    throw error;
  }
};

//****************************************
// Users
//****************************************

/**
 * Insert a User
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
const insertUser = async (req, res) => {
  try {
    const newUser = new UserModel({ ...req.body });
    await newUser.save();
    return await UserModel.findOne({ _id: newUser._id }).select("-password"); // .select() doesn't work with create, need to save then find
  } catch (error) {
    throw error;
  }
};

/**
 * Get User by Email
 * Gets a user by Email.  Not sure if we'll ever need this except for login.
 * If not needed except for login, we can move password comparison here
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
const getUserByEmail = async (req, res) => {
  try {
    // Returns null if no user is found
    // Need the password to be able to compare, removed .select()
    // We can strip the hash before returing the user
    return await UserModel.findOne({ email: req.body.email });
  } catch (error) {
    throw error;
  }
};

//****************************************
//  Monitors
//****************************************

/**
 * Update a user by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */

const updateUser = async (req, res) => {
  const candidateUserId = req.params.userId;
  const candidateUser = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      candidateUserId,
      candidateUser,
      { new: true } // Returns updated user instead of pre-update user
    ).select("-password");
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all monitors
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Array<Monitor>>}
 * @throws {Error}
 */
const getAllMonitors = async (req, res) => {
  try {
    const monitors = await Monitor.find({ isActive: true });
    return monitors;
  } catch (error) {
    throw error;
  }
};

/**
 * Get a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const getMonitorById = async (req, res) => {
  try {
    const monitor = await Monitor.findById(req.params.monitorId);
    return monitor;
  } catch (error) {
    throw error;
  }
};

/**
 * Get monitors by UserID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Array<Monitor>>}
 * @throws {Error}
 */
const getMonitorsByUserId = async (req, res) => {
  try {
    const monitors = await Monitor.find({ userId: req.params.userId });
    return monitors;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a monitor
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const createMonitor = async (req, res) => {
  try {
    const monitor = new Monitor({ ...req.body });
    monitor.userId = req.user._id;
    await monitor.save();
    return monitor;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const deleteMonitor = async (req, res) => {
  const monitorId = req.params.monitorId;
  try {
    const monitor = await Monitor.findByIdAndDelete(monitorId);
    if (!monitor) {
      throw new Error(`Monitor with id ${monitorId} not found`);
    }
    return monitor;
  } catch (error) {
    throw error;
  }
};

/**
 * Edit a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const editMonitor = async (req, res) => {
  const candidateId = req.params.monitorId;
  const candidateMonitor = req.body;
  try {
    const editedMonitor = await Monitor.findByIdAndUpdate(
      candidateId,
      candidateMonitor,
      { new: true }
    );
    return editedMonitor;
  } catch (error) {
    throw error;
  }
};

//****************************************
// Checks
//****************************************

/**
 * Create a check for a monitor
 * @async
 * @param {Object} checkData
 * @param {string} checkData.monitorId
 * @param {boolean} checkData.status
 * @param {number} checkData.responseTime
 * @param {number} checkData.statusCode
 * @param {string} checkData.message
 * @returns {Promise<Check>}
 * @throws {Error}
 */

const createCheck = async (checkData) => {
  try {
    const check = await new Check({ ...checkData }).save();
    return check;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all checks for a monitor
 * @async
 * @param {string} monitorId
 * @returns {Promise<Array<Check>>}
 * @throws {Error}
 */

const getChecks = async (monitorId) => {
  try {
    const checks = await Check.find({ monitorId });
    return checks;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete all checks for a monitor
 * @async
 * @param {string} monitorId
 * @returns {boolean}
 * @throws {Error}
 */

const deleteChecks = async (monitorId) => {
  try {
    const result = await Check.deleteMany({ monitorId });
    if (result.deletedCount > 0) {
      return result.deletedCount;
    } else {
      throw new Error(`No checks found for monitor with id ${monitorId}`);
    }
  } catch (error) {
    throw error;
  }
};

//****************************************
// Alerts
//****************************************

/**
 * Creates an Alert associated with a Monitor and User
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {<Promise<Alert>>}
 * @throws {Error}
 */
const createAlert = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, msg: "Create Alert", data: req.params.monitorId });
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all alerts a User has set
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {<Promise<Array<Alert>>}
 * @throws {Error}
 */
const getAlertsByUserId = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      msg: "Get Alerts By UserID",
      data: req.params.userId,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all alerts a for an associated Monitor
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {<Promise<Array<Alert>>}
 * @throws {Error}
 */
const getAlertsByMonitorId = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      msg: "Get Alerts By MonitorID",
      data: req.params.monitorId,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Gets an alert with specified ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Alert>}
 * @throws {Error}
 */
const getAlertById = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      msg: "Get Alert By alertID",
      data: req.params.alertId,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Returns an edited monitor with the specified ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Alert>>}
 * @throws {Error}
 */
const editAlert = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, msg: "Edit alert", data: req.params.alertId });
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a monitor with the specified ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @throws {Error}
 */
const deleteAlert = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, msg: "Delete alert", data: req.params.alertId });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  connect,
  insertUser,
  getUserByEmail,
  updateUser,
  getAllMonitors,
  getMonitorById,
  getMonitorsByUserId,
  createMonitor,
  deleteMonitor,
  editMonitor,
  createCheck,
  getChecks,
  deleteChecks,
  createAlert,
  getAlertsByUserId,
  getAlertsByMonitorId,
  getAlertById,
  editAlert,
  deleteAlert,
};
