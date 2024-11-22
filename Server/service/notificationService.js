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
	async sendEmail(networkResponse, address, alerts = []) {
		const { monitor, status, prevStatus } = networkResponse;
		if (monitor.type === "hardware") {
			const template = "hardwareIncidentTemplate";
			const context = { monitor: monitor.name, url: monitor.url, alerts };
			const subject = `Monitor ${monitor.name} infrastructure alerts`;
			this.emailService.buildAndSendEmail(template, context, address, subject);
			return;
		}
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

	async handleInfrastructureNotifications(networkResponse) {
		const thresholds = networkResponse?.monitor?.thresholds;
		if (thresholds === undefined) return; // No thresholds set, we're done

		// Get thresholds from monitor
		const {
			usage_cpu: cpuThreshold = -1,
			usage_memory: memoryThreshold = -1,
			usage_disk: diskThreshold = -1,
		} = thresholds;

		// Get metrics from response
		const metrics = networkResponse?.payload?.data ?? {};
		const {
			cpu: { usage_percent: cpuUsage = -1 } = {},
			memory: { usage_percent: memoryUsage = -1 } = {},
			disk = [],
		} = metrics;

		const alerts = {
			cpu: cpuThreshold !== -1 && cpuUsage > cpuThreshold ? true : false,
			memory: memoryThreshold !== -1 && memoryUsage > memoryThreshold ? true : false,
			disk: disk.some((d) => diskThreshold !== -1 && d.usage_percent > diskThreshold)
				? true
				: false,
		};

		const notifications = await this.db.getNotificationsByMonitorId(
			networkResponse.monitorId
		);
		for (const notification of notifications) {
			const alertsToSend = [];
			const alertTypes = ["cpu", "memory", "disk"];

			for (const type of alertTypes) {
				// Iterate over each alert type to see if any need to be decremented
				if (alerts[type] === true) {
					notification[`${type}AlertThreshold`]--; // Decrement threshold if an alert is triggered

					if (notification[`${type}AlertThreshold`] <= 0) {
						// If threshold drops below 0, reset and send notification
						notification[`${type}AlertThreshold`] = notification.alertThreshold;

						const formatAlert = {
							cpu: () =>
								`Your current CPU usage (${(cpuUsage * 100).toFixed(0)}%) is above your threshold (${(cpuThreshold * 100).toFixed(0)}%)`,
							memory: () =>
								`Your current memory usage (${(memoryUsage * 100).toFixed(0)}%) is above your threshold (${(memoryThreshold * 100).toFixed(0)}%)`,
							disk: () =>
								`Your current disk usage: ${disk
									.map((d, idx) => `(Disk${idx}: ${(d.usage_percent * 100).toFixed(0)}%)`)
									.join(
										", "
									)} is above your threshold (${(diskThreshold * 100).toFixed(0)}%)`,
						};

						alertsToSend.push(formatAlert[type]());
					}
				}
			}

			await notification.save();

			if (alertsToSend.length === 0) continue; // No alerts to send, we're done

			if (notification.type === "email") {
				this.sendEmail(networkResponse, notification.address, alertsToSend);
			}
		}
	}
}

export default NotificationService;
