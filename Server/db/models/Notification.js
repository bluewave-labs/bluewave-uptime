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
	},
	{
		timestamps: true,
	}
);
export default mongoose.model("Notification", NotificationSchema);
