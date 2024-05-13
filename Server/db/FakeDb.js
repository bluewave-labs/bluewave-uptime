// **************************
// The idea here is to provide a layer of abstraction between the database and whoever is using it.
// Instead of directly calling mongoose methods, we can call the methods on the DB object.
// If this were Typescript or Java or Golang an interface would be implemented to ensure the methods are available.
// But we do the best we can with Javascript.
//
// If the methods are consistent all we have to do to swap out one DB for another is simply change the import.
//
// Example:
// We start with the fake DB:
//
// const db = require("../db/FakeDb");
// const monitors = await db.getAllMonitors();
//
// And when we want to swtich to a real DB, all we have to do is swap the import
//
// const db = require("../db/MongoDb");
// const monitors = await db.getAllMonitors();
//
// The rest of the code is the same, as all the `db` methods are standardized.
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

const connect = async () => {
  try {
    await console.log("Connected to FakeDB");
  } catch (error) {
    console.error(error);
  }
};

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

module.exports = {
  connect,
  getAllMonitors,
  getMonitorById,
  getMonitorsByUserId,
};
