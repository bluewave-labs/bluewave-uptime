const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const monitorRouter = require("./routes/monitorRoute");
const checkRouter = require("./routes/checkRoute");
const alertRouter = require("./routes/alertRoute");
const { connectDbAndRunServer } = require("./configs/db");
require("dotenv").config();
const logger = require("./utils/logger");
const { verifyJWT } = require("./middleware/verifyJWT");
const { handleErrors } = require("./middleware/handleErrors");
const queueRouter = require("./routes/queueRoute");
const JobQueue = require("./service/jobQueue");
const pageSpeedCheckRouter = require("./routes/pageSpeedCheckRoute");

// Need to wrap server setup in a function to handle async nature of JobQueue
const startApp = async () => {
  // const { sendEmail } = require('./utils/sendEmail')

  // **************************
  // Here is where we can swap out DBs easily.  Spin up a mongoDB instance and try it out.
  // Simply comment out the FakeDB and uncomment the MongoDB or vice versa.
  // We can easily swap between any type of data source as long as the methods are implemented
  //
  // FakeDB
  // const db = require("./db/FakeDb");
  //
  // MongoDB
  // const db = require("./db/MongoDB");
  //
  // **************************
  const DB_TYPE = {
    MongoDB: () => require("./db/MongoDB"),
    FakedDB: () => require("./db/FakeDb"),
  };

  const db = DB_TYPE[process.env.DB_TYPE]
    ? DB_TYPE[process.env.DB_TYPE]()
    : require("./db/FakeDb");

  /**
   * NOTES
   * Email Service will be added
   * Logger Service will be added (Winston or similar)
   */

  const app = express();

  // middlewares
  app.use(
    cors()
    //We will add configuration later
  );
  app.use(express.json());
  app.use(helmet());

  // **************************
  // Make DB accessible anywhere we have a Request object
  // By adding the DB to the request object, we can access it in any route
  // Thus we do not need to import it in every route file, and we can easily swap out DBs as there is only one place to change it
  // Same applies for JobQueue
  // **************************
  app.use((req, res, next) => {
    req.db = db;
    req.jobQueue = jobQueue;
    next();
  });

  //routes
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/monitors", verifyJWT, monitorRouter);
  app.use("/api/v1/checks", verifyJWT, checkRouter);
  app.use("/api/v1/alerts", verifyJWT, alertRouter);
  app.use("/api/v1/pagespeed", verifyJWT, pageSpeedCheckRouter);
  //Temporary route for testing, remove later
  app.use("/api/v1/job", queueRouter);

  //health check
  app.use("/api/v1/healthy", (req, res) => {
    try {
      logger.info("Checking Health of the server.");
      return res.status(200).json({ message: "Healthy" });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: error.message });
    }
  });

  /**
   * Error handler middleware
   * Should be called last
   */
  app.use(handleErrors);

  await connectDbAndRunServer(app, db);
  const jobQueue = await JobQueue.createJobQueue(db);

  const cleanup = async () => {
    console.log("Shutting down gracefully");
    await jobQueue.obliterate();
    console.log("Finished cleanup");
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
};

startApp().catch((error) => {
  console.log(error);
});
