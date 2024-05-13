const Monitor = require("../models/Monitor");
const mongoose = require("mongoose");

const seedDatabase = async () => {
  const FAKE_MONITOR_DATA = [];

  for (let i = 0; i < 10; i++) {
    FAKE_MONITOR_DATA.push(
      new Monitor({
        userId: i % 2 === 0 ? 1 : 2,
        name: `Monitor ${i}`,
        description: `Description for Monitor ${i}`,
        url: `https://monitor${i}.com`,
        isActive: true,
        interval: 60000,
        updated_at: new Date(),
        created_at: new Date(),
      })
    );
  }

  for (const monitor of FAKE_MONITOR_DATA) {
    await monitor.save();
  }
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");

    const monitors = await Monitor.find();
    if (monitors.length === 0) {
      console.log("Seeding database with fake data");
      await seedDatabase();
    } else {
      console.log("Database already seeded");
    }
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
