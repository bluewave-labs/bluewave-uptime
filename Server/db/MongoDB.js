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

const insertUser = async (req, res) => {
  try {
    const newUser = await UserModel.create({ ...req.body });
    return newUser;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (req, res) => {
  try {
    // Returns null if no user is found
    const user = await UserModel.findOne({ email: req.body.email });
    return user;
  } catch (error) {
    throw error;
  }
};

// Gets all monitors
const getAllMonitors = async (req, res) => {
  try {
    const monitors = await Monitor.find();
    return monitors;
  } catch (error) {
    throw error;
  }
};

// Get a monitor by ID
const getMonitorById = async (req, res) => {
  try {
    const monitor = await Monitor.findById(req.params.monitorId);
    return monitor;
  } catch (error) {
    throw error;
  }
};

// Gets a monitor by user ID
const getMonitorsByUserId = async (req, res) => {
  try {
    const monitors = await Monitor.find({ userId: req.params.userId });
    return monitors;
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
};
