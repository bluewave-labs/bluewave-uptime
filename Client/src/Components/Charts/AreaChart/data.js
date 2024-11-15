const ObjectId = (string) => string;
const ISODate = (string) => string;

// Helper to generate random percentage between 0.1 and 1.0
const randomPercent = () => Number((Math.random() * 0.9 + 0.1).toFixed(2));

// Create base timestamp and increment by 5 minutes for each entry
const baseTime = new Date("2024-11-15T07:00:00.000Z");
const checks = Array.from({ length: 20 }, (_, index) => {
	const timestamp = new Date(baseTime.getTime() + index * 5 * 60 * 1000);

	return {
		_id: ObjectId(`6736f4f449e23954c8b89a${index.toString(16).padStart(2, "0")}`),
		monitorId: ObjectId("6736e6c2939f02e0ca519465"),
		status: true,
		responseTime: Math.floor(Math.random() * 50) + 80, // Random between 80-130ms
		statusCode: 200,
		message: "OK",
		cpu: {
			physical_core: 0,
			logical_core: 0,
			frequency: 0,
			temperature: 0,
			free_percent: 0,
			usage_percent: randomPercent(),
			_id: ObjectId(`6736f4f449e23954c8b89b${index.toString(16).padStart(2, "0")}`),
		},
		memory: {
			total_bytes: 0,
			available_bytes: 0,
			used_bytes: 0,
			usage_percent: randomPercent(),
			_id: ObjectId(`6736f4f449e23954c8b89c${index.toString(16).padStart(2, "0")}`),
		},
		disk: [
			{
				read_speed_bytes: 0,
				write_speed_bytes: 0,
				total_bytes: 0,
				free_bytes: 0,
				usage_percent: randomPercent(),
				_id: ObjectId(`6736f4f449e23954c8b89d${index.toString(16).padStart(2, "0")}`),
			},
		],
		host: {
			os: "",
			platform: "",
			kernel_version: "",
			_id: ObjectId(`6736f4f449e23954c8b89e${index.toString(16).padStart(2, "0")}`),
		},
		errors: [],
		expiry: ISODate(new Date(timestamp.getTime() + 24 * 60 * 60 * 1000).toISOString()),
		createdAt: ISODate(timestamp.toISOString()),
		updatedAt: ISODate(timestamp.toISOString()),
		__v: 0,
	};
});

export default checks;
