// **************************
// FakeDB is used to simulate the database
// If we standarize the DB methods we can swap out databases easily
// Too bad JS doesn't have interfaces, that would be nice.  TypeScript anyone?
// **************************

const Monitor = require("../models/Monitor");

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

const getAllMonitors = async () => {
  return FAKE_MONITOR_DATA;
};

const getMonitorById = async (monitorId) => {
  const idx = FAKE_MONITOR_DATA.findIndex((monitor) => {
    return monitor.id === monitorId;
  });
  if (idx === -1) {
    throw new Error(`Monitor with id ${monitorId} not found`);
  }
  return FAKE_MONITOR_DATA[idx];
};

const getMonitorsByUserId = async (userId) => {
  const userMonitors = FAKE_MONITOR_DATA.filter((monitor) => {
    return monitor.userId === userId;
  });

  if (userMonitors.length === 0) {
    throw new Error(`Monitors for user ${userId} not found`);
  }

  return userMonitors;
};

// Conisder standardizing these methods so we can swap databases easily
module.exports = { getAllMonitors, getMonitorById, getMonitorsByUserId };
