class NotificationService {
	/**
	 * Creates an instance of NotificationService.
	 *
	 * @param {Object} emailService - The email service used for sending notifications.
	 * @param {Object} db - The database instance for storing notification data.
	 * @param {Object} logger - The logger instance for logging activities.
	 */
	constructor(emailService, db, logger) {
		this.SERVICE_NAME = "NotificationService";
		this.emailService = emailService;
		this.db = db;
		this.logger = logger;
	}

	/**
	 * Sends an email notification based on the network response.
	 *
	 * @param {Object} networkResponse - The response from the network monitor.
	 * @param {Object} networkResponse.monitor - The monitor object containing details about the monitored service.
	 * @param {string} networkResponse.monitor.name - The name of the monitor.
	 * @param {string} networkResponse.monitor.url - The URL of the monitor.
	 * @param {boolean} networkResponse.status - The current status of the monitor (true for up, false for down).
	 * @param {boolean} networkResponse.prevStatus - The previous status of the monitor (true for up, false for down).
	 * @param {string} address - The email address to send the notification to.
	 */
	async sendEmail(networkResponse, address) {
		const { monitor, status, prevStatus } = networkResponse;
		const template = prevStatus === false ? "serverIsUpTemplate" : "serverIsDownTemplate";
		const context = { monitor: monitor.name, url: monitor.url };
		const subject = `Monitor ${monitor.name} is ${status === true ? "up" : "down"}`;
		this.emailService.buildAndSendEmail(template, context, address, subject);
	}

	/**
	 * Handles notifications based on the network response.
	 *
	 * @param {Object} networkResponse - The response from the network monitor.
	 * @param {string} networkResponse.monitorId - The ID of the monitor.
	 */
	async handleNotifications(networkResponse) {
		try {
			const notifications = await this.db.getNotificationsByMonitorId(
				networkResponse.monitorId
			);
			for (const notification of notifications) {
				if (notification.type === "email") {
					this.sendEmail(networkResponse, notification.address);
				}
				// Handle other types of notifications here
			}
		} catch (error) {
			this.logger.warn({
				message: error.message,
				service: this.SERVICE_NAME,
				method: "handleNotifications",
				stack: error.stack,
			});
		}
	}
}

export default NotificationService;
