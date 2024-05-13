const Monitor = require("../models/Monitor");
const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
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
  getAllMonitors,
  getMonitorById,
  getMonitorsByUserId,
};
