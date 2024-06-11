const Monitor = require("../models/Monitor");
const mongoose = require("mongoose");
const UserModel = require("../models/user");
const Check = require("../models/Check");
const Alert = require("../models/Alert");
const RecoveryToken = require("../models/RecoveryToken");
const crypto = require("crypto");

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
 * Throws error if user not found
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
const getUserByEmail = async (req, res) => {
  try {
    // Need the password to be able to compare, removed .select()
    // We can strip the hash before returing the user
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return user;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

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
 * Request a recovery token
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
const requestRecoveryToken = async (req, res) => {
  try {
    // Delete any existing tokens
    await RecoveryToken.deleteMany({ email: req.body.email });
    let recoveryToken = new RecoveryToken({
      email: req.body.email,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await recoveryToken.save();
    return recoveryToken;
  } catch (error) {
    throw error;
  }
};

const validateRecoveryToken = async (req, res) => {
  try {
    const candidateToken = req.body.recoveryToken;
    const recoveryToken = await RecoveryToken.findOne({
      token: candidateToken,
    });
    if (recoveryToken !== null) {
      return recoveryToken;
    } else {
      throw new Error("Token not found");
    }
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (req, res) => {
  try {
    const newPassword = req.body.password;

    // Validate token again
    const recoveryToken = await validateRecoveryToken(req, res);
    const user = await UserModel.findOne({ email: recoveryToken.email });

    if (user !== null) {
      user.password = newPassword;
      await user.save();
      await RecoveryToken.deleteMany({ email: recoveryToken.email });
      // Fetch the user again without the password
      const userWithoutPassword = await UserModel.findOne({
        email: recoveryToken.email,
      }).select("-password");
      return userWithoutPassword;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {}
};

//****************************************
//  Monitors
//****************************************

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
    console.log(checkData);
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
 * @returns {number}
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
 * @param {Object} alertData
 * @param {string} alertData.checkId
 * @param {string} alert.monitorId
 * @param {string} alert.userId
 * @param {boolean} alert.status
 * @param {string} alert.message
 * @param {boolean} alert.notifiedStatus
 * @param {boolean} alert.acknowledgeStatus
 * @returns {<Promise<Alert>>}
 * @throws {Error}
 */
const createAlert = async (alertData) => {
  try {
    const alert = await new Alert({ ...alertData }).save();
    return alert;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all alerts a User has set
 * @async
 * @param {string} userId
 * @returns {<Promise<Array<Alert>>}
 * @throws {Error}
 */
const getAlertsByUserId = async (userId) => {
  try {
    const alerts = await Alert.find({ userId });
    return alerts;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all alerts a for an associated Monitor
 * @async
 * @param {string} monitorId
 * @returns {<Promise<Array<Alert>>}
 * @throws {Error}
 */
const getAlertsByMonitorId = async (monitorId) => {
  try {
    const alerts = await Alert.find({ monitorId });
    return alerts;
  } catch (error) {
    throw error;
  }
};

/**
 * Returns an alert with specified ID
 * @async
 * @param {string} alertId
 * @returns {Promise<Alert>}
 * @throws {Error}
 */
const getAlertById = async (alertId) => {
  try {
    const alert = await Alert.findById(alertId);
    return alert;
  } catch (error) {
    throw error;
  }
};

/**
 * Returns an edited alert with the specified ID
 * @async
 * @param {string} alertId
 * @param {Object} alertData
 * @param {string} alertData.checkId
 * @param {string} alertData.monitorId
 * @param {string} alertData.userId
 * @param {boolean} alertData.status
 * @param {string} alertData.message
 * @param {boolean} alertData.notifiedStatus
 * @param {boolean} alertData.acknowledgeStatus
 * @param {Express.Response} res
 * @returns {Promise<Alert>>}
 * @throws {Error}
 */
const editAlert = async (alertId, alertData) => {
  try {
    const editedAlert = await Alert.findByIdAndUpdate(alertId, alertData, {
      new: true,
    });
    return editedAlert;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes an alert with the specified ID
 * @async
 * @param {string} alertId
 * @throws {Error}
 */
const deleteAlert = async (alertId) => {
  try {
    const result = await Alert.findByIdAndDelete(alertId);
    if (result) {
      return result;
    } else throw new Error(`Alert with id ${alertId} not found`);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  connect,
  insertUser,
  getUserByEmail,
  updateUser,
  requestRecoveryToken,
  validateRecoveryToken,
  resetPassword,
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
