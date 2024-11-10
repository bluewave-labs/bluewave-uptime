import axios from "axios";

class NtfyService {
	constructor(logger) {
		this.logger = logger;
		this.SERVICE_NAME = "NtfyService";
	}

	/**
	 * Sends a Ntfy notification.
	 *
	 * @param {Object} ntfyConfig - Configuration for Ntfy.
	 * @param {string} ntfyConfig.topic - The Ntfy topic.
	 * @param {string} ntfyConfig.serverUrl - The server URL for Ntfy.
	 * @param {string} ntfyConfig.friendlyName - A friendly name for the notification.
	 * @param {string} ntfyConfig.priority - Priority of the notification.
	 * @param {string} ntfyConfig.authMode - Authentication mode ("no-auth" or user-pass" or "accessToken").
	 */
	async sendNtfyNotification(ntfyConfig, networkResponse) {
		const { monitor, status } = networkResponse;
		try {
			// Set up authorization headers based on authMode
			let headers = {
				Title: ntfyConfig.friendlyName || `Monitor Alert`,
				Priority: ntfyConfig.priority,
				Tags: "warning",
				"Content-Type": "text/plain",
			};

			if (
				ntfyConfig.authMode === "user-pass" &&
				ntfyConfig.username &&
				ntfyConfig.password
			) {
				headers.Authorization =
					"Basic " +
					Buffer.from(`${ntfyConfig.username}:${ntfyConfig.password}`).toString(
						"base64"
					);
			} else if (ntfyConfig.authMode === "accessToken" && ntfyConfig.accessToken) {
				headers.Authorization = "Bearer " + ntfyConfig.accessToken;
			}

			// Ensure the server URL does not have a trailing slash
			const serverUrl = ntfyConfig.serverUrl.endsWith("/")
				? ntfyConfig.serverUrl.slice(0, -1)
				: ntfyConfig.serverUrl;

			// Plain text body message
			const ntfyBody = `Status of ${monitor.name} is ${status ? "up" : "down"}`;

			// Send the Ntfy notification
			const response = await axios.post(`${serverUrl}/${ntfyConfig.topic}`, ntfyBody, {
				headers,
			});

			if (response.status === 200) {
				this.logger.info({
					service: this.SERVICE_NAME,
					message: "Ntfy notification sent successfully",
				});
			} else {
				this.logger.error({
					service: this.SERVICE_NAME,
					message: "An error occurred while sending notification",
				});
			}
		} catch (error) {
			this.logger.error(`Failed to send Ntfy notification: ${error.message}`, {
				service: this.SERVICE_NAME,
				method: "sendNtfyNotification",
			});
		}
	}
}

export default NtfyService;
