import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "./utils/logger.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import { handleErrors } from "./middleware/handleErrors.js";
import { errorMessages } from "./utils/messages.js";
import authRouter from "./routes/authRoute.js";
import inviteRouter from "./routes/inviteRoute.js";
import monitorRouter from "./routes/monitorRoute.js";
import checkRouter from "./routes/checkRoute.js";
import maintenanceWindowRouter from "./routes/maintenanceWindowRoute.js";
import settingsRouter from "./routes/settingsRoute.js";
import { fileURLToPath } from "url";

import { connectDbAndRunServer } from "./configs/db.js";
import queueRouter from "./routes/queueRoute.js";
import JobQueue from "./service/jobQueue.js";

//Network service and dependencies
import NetworkService from "./service/networkService.js";
import axios from "axios";
import ping from "ping";
import http from "http";

// Email service and dependencies
import EmailService from "./service/emailService.js";
import nodemailer from "nodemailer";
import pkg from "handlebars";
const { compile } = pkg;
import mjml2html from "mjml";

import SettingsService from "./service/settingsService.js";
import db from "./db/mongo/MongoDB.js";
import { fetchMonitorCertificate } from "./controllers/controllerUtils.js";
const SERVICE_NAME = "Server";

let cleaningUp = false;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openApiSpec = JSON.parse(
	fs.readFileSync(path.join(__dirname, "openapi.json"), "utf8")
);
// Need to wrap server setup in a function to handle async nature of JobQueue
const startApp = async () => {
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
	// const DB_TYPE = {
	//   MongoDB: async () => (await import("./db/mongo/MongoDB.js")).default,
	//   FakedDB: async () => (await import("./db/FakeDb.js")).default,
	// };

	// const db = DB_TYPE[process.env.DB_TYPE]
	//   ? DB_TYPE[process.env.DB_TYPE]()
	//   : require("./db/FakeDb");

	// const db = DB_TYPE.MongoDB();

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
	// Same applies for JobQueue and emailService
	// **************************
	app.use((req, res, next) => {
		req.db = db;
		req.jobQueue = jobQueue;
		req.emailService = emailService;
		req.settingsService = settingsService;
		next();
	});

	// Swagger UI
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

	//routes
	app.use("/api/v1/auth", authRouter);
	app.use("/api/v1/settings", verifyJWT, settingsRouter);
	app.use("/api/v1/invite", inviteRouter);
	app.use("/api/v1/monitors", verifyJWT, monitorRouter);
	app.use("/api/v1/checks", verifyJWT, checkRouter);
	app.use("/api/v1/maintenance-window", verifyJWT, maintenanceWindowRouter);
	app.use("/api/v1/queue", verifyJWT, queueRouter);

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

	app.use("/api/v1/mail", async (req, res) => {
		try {
			const id = await req.emailService.buildAndSendEmail(
				"welcomeEmailTemplate",
				{
					name: "Alex",
				},
				"ajhollid@gmail.com",
				"Welcome"
			);
			res.status(200).json({ success: true, msg: "Email sent", data: id });
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

	// Create services
	await connectDbAndRunServer(app, db);
	const settingsService = new SettingsService();

	await settingsService.loadSettings();
	const emailService = new EmailService(
		settingsService,
		fs,
		path,
		compile,
		mjml2html,
		nodemailer,
		logger
	);
	const networkService = new NetworkService(db, emailService, axios, ping, logger, http);
	const jobQueue = await JobQueue.createJobQueue(db, networkService, settingsService);

	const cleanup = async () => {
		if (cleaningUp) {
			console.log("Already cleaning up");
			return;
		}
		cleaningUp = true;
		try {
			console.log("Shutting down gracefully");
			await jobQueue.obliterate();
			console.log("Finished cleanup");
		} catch (error) {
			logger.error(errorMessages.JOB_QUEUE_DELETE_JOB, {
				service: SERVICE_NAME,
				errorMsg: error.message,
			});
		}
		process.exit(0);
	};
	process.on("SIGUSR2", cleanup);
	process.on("SIGINT", cleanup);
	process.on("SIGTERM", cleanup);
};

startApp().catch((error) => {
	console.log(error);
});
