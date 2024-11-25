import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "./utils/logger.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import { handleErrors } from "./middleware/handleErrors.js";
import authRouter from "./routes/authRoute.js";
import inviteRouter from "./routes/inviteRoute.js";
import monitorRouter from "./routes/monitorRoute.js";
import checkRouter from "./routes/checkRoute.js";
import maintenanceWindowRouter from "./routes/maintenanceWindowRoute.js";
import settingsRouter from "./routes/settingsRoute.js";
import statusPageRouter from "./routes/statusPageRoute.js";
import { fileURLToPath } from "url";

import queueRouter from "./routes/queueRoute.js";

//JobQueue service and dependencies
import JobQueue from "./service/jobQueue.js";
import { Queue, Worker } from "bullmq";

//Network service and dependencies
import NetworkService from "./service/networkService.js";
import axios from "axios";
import ping from "ping";
import http from "http";
import Docker from "dockerode";

// Email service and dependencies
import EmailService from "./service/emailService.js";
import nodemailer from "nodemailer";
import pkg from "handlebars";
const { compile } = pkg;
import mjml2html from "mjml";

// Settings Service and dependencies
import SettingsService from "./service/settingsService.js";
import AppSettings from "./db/models/AppSettings.js";

import StatusService from "./service/statusService.js";
import NotificationService from "./service/notificationService.js";

import db from "./db/mongo/MongoDB.js";
const SERVICE_NAME = "Server";
const SHUTDOWN_TIMEOUT = 1000;

let isShuttingDown = false;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openApiSpec = JSON.parse(
	fs.readFileSync(path.join(__dirname, "openapi.json"), "utf8")
);

const PORT = 5000;

// Need to wrap server setup in a function to handle async nature of JobQueue
const startApp = async () => {
	const app = express();

	// middlewares
	app.use(
		cors()
		//We will add configuration later
	);
	app.use(express.json());
	app.use(helmet());

	// Add db, jobQueue, emailService, and settingsService to request object for easy access
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
	app.use("/api/v1/status-page", statusPageRouter);

	app.use("/api/v1/dummy-data", async (req, res) => {
		try {
			const response = await axios.get(
				"https://gist.githubusercontent.com/ajhollid/9afa39410c7bbf52cc905f285a2225bf/raw/429a231a3559ebc95f6f488ed2c766bd7d6f46e5/dummyData.json",
				{
					headers: {
						"Content-Type": "application/json",
						"Cache-Control": "no-cache",
					},
				}
			);
			return res.status(200).json(response.data);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	});

	//health check
	app.use("/api/v1/healthy", (req, res) => {
		try {
			logger.info({ message: "Checking Health of the server." });
			return res.status(200).json({ message: "Healthy" });
		} catch (error) {
			logger.error({
				message: error.message,
				service: SERVICE_NAME,
				method: "healthCheck",
				stack: error.stack,
			});
			return res.status(500).json({ message: error.message });
		}
	});

	/**
	 * Error handler middleware
	 * Should be called last
	 */
	app.use(handleErrors);

	// Create services
	await db.connect();
	const server = app.listen(PORT, () => {
		logger.info({ message: `server started on port:${PORT}` });
	});

	const settingsService = new SettingsService(AppSettings);
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
	const networkService = new NetworkService(axios, ping, logger, http, Docker);
	const statusService = new StatusService(db, logger);
	const notificationService = new NotificationService(emailService, db, logger);
	const jobQueue = await JobQueue.createJobQueue(
		db,
		networkService,
		statusService,
		notificationService,
		settingsService,
		logger,
		Queue,
		Worker
	);

	const shutdown = async () => {
		if (isShuttingDown) {
			return;
		}
		isShuttingDown = true;
		logger.info({ message: "Attempting graceful shutdown" });
		setTimeout(() => {
			logger.error({
				message: "Could not shut down in time, forcing shutdown",
				service: SERVICE_NAME,
				method: "shutdown",
			});
			process.exit(1);
		}, SHUTDOWN_TIMEOUT);
		try {
			server.close();
			await jobQueue.obliterate();
			await db.disconnect();
			logger.info({ message: "Graceful shutdown complete" });
			process.exit(0);
		} catch (error) {
			logger.error({
				message: error.message,
				service: SERVICE_NAME,
				method: "shutdown",
				stack: error.stack,
			});
		}
	};

	process.on("SIGUSR2", shutdown);
	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
};

startApp().catch((error) => {
	logger.error({
		message: error.message,
		service: SERVICE_NAME,
		method: "startApp",
		stack: error.stack,
	});
	process.exit(1);
});
