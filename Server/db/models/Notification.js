import mongoose from "mongoose";
const NotificationSchema = mongoose.Schema(
	{
		monitorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Monitor",
			immutable: true,
		},
		type: {
			type: String,
			enum: ["email", "sms"],
		},
		address: {
			type: String,
		},
		phone: {
			type: String,
		},
		alertThreshold: {
			type: Number,
			default: 5,
		},
		cpuAlertThreshold: {
			type: Number,
			default: function () {
				return this.alertThreshold;
			},
		},
		memoryAlertThreshold: {
			type: Number,
			default: function () {
				return this.alertThreshold;
			},
		},
		diskAlertThreshold: {
			type: Number,
			default: function () {
				return this.alertThreshold;
			},
		},
		tempAlertThreshold: {
			type: Number,
			default: function () {
				return this.alertThreshold;
			},
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.model("Notification", NotificationSchema);
