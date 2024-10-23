import mongoose from "mongoose";

const cpuSchema = mongoose.Schema({
	physical_core: { type: Number, default: 0 },
	logical_core: { type: Number, default: 0 },
	frequency: { type: Number, default: 0 },
	temperature: { type: Number, default: 0 },
	free_percent: { type: Number, default: 0 },
	usage_percent: { type: Number, default: 0 },
	usage_threshold: { type: Number, default: 0 },
});

const memorySchema = mongoose.Schema({
	total_bytes: { type: Number, default: 0 },
	available_bytes: { type: Number, default: 0 },
	used_bytes: { type: Number, default: 0 },
	usage_percent: { type: Number, default: 0 },
	usage_threshold: { type: Number, default: 0 },
});

const discSchema = mongoose.Schema({
	read_speed_bytes: { type: Number, default: 0 },
	write_speed_bytes: { type: Number, default: 0 },
	total_bytes: { type: Number, default: 0 },
	free_bytes: { type: Number, default: 0 },
	usage_percent: { type: Number, default: 0 },
	usage_threshold: { type: Number, default: 0 },
});

const hostSchema = mongoose.Schema({
	os: { type: String, default: "" },
	platform: { type: String, default: "" },
	kernel_version: { type: String, default: "" },
});

const HardwareCheckSchema = mongoose.Schema(
	{
		monitorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Monitor",
			immutable: true,
		},
		cpu: {
			type: cpuSchema,
			default: () => ({}),
		},
		memory: {
			type: memorySchema,
			default: () => ({}),
		},
		disk: {
			type: [discSchema],
			default: () => [],
		},
		host: {
			type: hostSchema,
			default: () => ({}),
		},
	},
	{ timestamps: true }
);

export default mongoose.model("HardwareCheck", HardwareCheckSchema);
