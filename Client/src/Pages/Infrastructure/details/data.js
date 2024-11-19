function generateMonitorEntries(monitorId, count = 10, options = {}) {
	const defaultOptions = {
		timeRange: {
			start: new Date(Date.now() - 24 * 60 * 60 * 1000 * 20),
			end: new Date(),
		},
		statusVariation: [true, false],
		responseTimeRange: [50, 500],
		cpuUsageRange: [0, 1],
		memoryUsageRange: [0, 1],
		diskUsageRange: [0, 1],
	};

	const mergedOptions = { ...defaultOptions, ...options };
	const startTime = mergedOptions.timeRange.start.getTime();
	const endTime = mergedOptions.timeRange.end.getTime();
	const totalTimeSpan = endTime - startTime;

	// Generate sorted random time points
	const timePoints = Array.from({ length: count }, (_, index) => {
		// Use a non-linear distribution to create more varied spacing
		const progress = Math.pow(Math.random(), 2); // Bias towards earlier times
		return startTime + progress * totalTimeSpan;
	}).sort((a, b) => a - b);

	return timePoints.map((timestamp) => {
		const createdAt = new Date(timestamp);

		return {
			_id: "123",
			monitorId: monitorId,
			status: randomFromArray(mergedOptions.statusVariation),
			responseTime: randomInRange(mergedOptions.responseTimeRange),
			statusCode: randomStatusCode(),
			message: randomMessage(),
			cpu: {
				physical_core: randomInRange([4, 8]),
				logical_core: randomInRange([4, 16]),
				frequency: randomInRange([10, 4000]),
				temperature: randomInRange([20, 90]),
				free_percent: 1 - randomInRange(mergedOptions.cpuUsageRange),
				usage_percent: randomInRange(mergedOptions.cpuUsageRange),
				_id: "123",
			},
			memory: {
				total_bytes: randomInRange([8, 32]) * 1024 * 1024 * 1024,
				available_bytes: randomInRange([4, 16]) * 1024 * 1024 * 1024,
				used_bytes: randomInRange([4, 16]) * 1024 * 1024 * 1024,
				usage_percent: randomInRange(mergedOptions.memoryUsageRange),
				_id: "123",
			},
			disk: [
				{
					read_speed_bytes: randomInRange([100, 1000]) * 1024 * 1024,
					write_speed_bytes: randomInRange([100, 1000]) * 1024 * 1024,
					total_bytes: randomInRange([100, 1000]) * 1024 * 1024 * 1024,
					free_bytes: randomInRange([50, 500]) * 1024 * 1024 * 1024,
					usage_percent: randomInRange(mergedOptions.diskUsageRange),
					_id: "123",
				},
			],
			host: {
				os: randomOS(),
				platform: randomPlatform(),
				kernel_version: randomKernelVersion(),
				_id: "123",
			},
			errors: randomErrors(),
			expiry: new Date(createdAt.getTime() + 365 * 24 * 60 * 60 * 1000),
			createdAt: createdAt,
			updatedAt: createdAt,
			__v: 0,
		};
	});
}

// Modify randomInRange to work with decimal ranges
function randomInRange([min, max]) {
	return Number((Math.random() * (max - min) + min).toFixed(2));
}

// ... rest of the code remains the same
function randomFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function randomStatusCode() {
	const statusCodes = [200, 201, 204, 400, 401, 403, 404, 500, 502, 503];
	return randomFromArray(statusCodes);
}

function randomMessage() {
	const messages = [
		"OK",
		"Created",
		"No Content",
		"Bad Request",
		"Unauthorized",
		"Forbidden",
		"Not Found",
		"Internal Server Error",
	];
	return randomFromArray(messages);
}

function randomOS() {
	const oss = ["Windows", "Linux", "macOS", "Ubuntu", "CentOS"];
	return randomFromArray(oss);
}

function randomPlatform() {
	const platforms = ["x64", "x86", "ARM", "ARM64"];
	return randomFromArray(platforms);
}

function randomKernelVersion() {
	return `${randomInRange([4, 6])}.${randomInRange([0, 20])}.${randomInRange([0, 100])}`;
}

function randomErrors() {
	const possibleErrors = [
		"Network timeout",
		"Connection refused",
		"SSL certificate error",
		"DNS resolution failed",
		"",
	];
	return Math.random() < 0.2 ? [randomFromArray(possibleErrors)] : [];
}

// Usage
const monitorId = "123";
export const monitorData = generateMonitorEntries(monitorId, 20);
