const Monitor = require("../models/Monitor");
const mongoose = require("mongoose");
const UserModel = require("../models/user");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    throw error;
  }
};

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
    const monitors = await Monitor.find();
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

module.exports = {
  connect,
  insertUser,
  getUserByEmail,
  getAllMonitors,
  getMonitorById,
  getMonitorsByUserId,
  createMonitor,
  deleteMonitor,
  editMonitor,
};
