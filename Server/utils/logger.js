import winston from "winston";
/**
 * @module
 * @example
 * logger.info("Registered a new user!")
 * logger.warn("User not found!")
 * logger.error("Cannot save")
 * @example
 * "Specify service and ID in the log if applicable."
 * logger.error("Descriptive Message",{"service":"monitor","monitorId":"123456"})
 * logger.error("Incorrect Credentials",{"service":"Auth","userId":"654321"})
 * logger.error("User not found!",{"service":"Auth"})
 */
const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "app.log" }),
	],
});

export default logger;
