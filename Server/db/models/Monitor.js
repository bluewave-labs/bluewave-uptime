import mongoose from "mongoose";
import Notification from "./Notification.js";

const MonitorSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			immutable: true,
			required: true,
		},
		teamId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Team",
			immutable: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		status: {
			type: Boolean,
			default: undefined,
		},
		type: {
			type: String,
			required: true,
			enum: ["http", "ping", "pagespeed"],
		},
		url: {
			type: String,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		interval: {
			// in milliseconds
			type: Number,
			default: 60000,
		},
		uptimePercentage: {
			type: Number,
			default: undefined,
		},
		notifications: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Notification",
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Monitor", MonitorSchema);
