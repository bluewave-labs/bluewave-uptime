import HardwareCheck from "../../models/HardwareCheck.js";
import Monitor from "../../models/Monitor.js";
import logger from "../../../utils/logger.js";

const SERVICE_NAME = "hardwareCheckModule";
const createHardwareCheck = async (hardwareCheckData) => {
	try {
		const { monitorId, status } = hardwareCheckData;
		const n = (await HardwareCheck.countDocuments({ monitorId })) + 1;
		const monitor = await Monitor.findById(monitorId);

		if (!monitor) {
			logger.error({
				message: "Monitor not found",
				service: SERVICE_NAME,
				method: "createHardwareCheck",
				details: `monitor ID: ${monitorId}`,
			});
			return null;
		}

		let newUptimePercentage;
		if (monitor.uptimePercentage === undefined) {
			newUptimePercentage = status === true ? 1 : 0;
		} else {
			newUptimePercentage =
				(monitor.uptimePercentage * (n - 1) + (status === true ? 1 : 0)) / n;
		}

		await Monitor.findOneAndUpdate(
			{ _id: monitorId },
			{ uptimePercentage: newUptimePercentage }
		);

		const hardwareCheck = await new HardwareCheck({
			...hardwareCheckData,
		}).save();
		return hardwareCheck;
	} catch (error) {
		console.log("error creating hardware check", error);
		error.service = SERVICE_NAME;
		error.method = "createHardwareCheck";
		throw error;
	}
};

const deleteHardwareChecksByMonitorId = async (monitorId) => {
	try {
		const result = await HardwareCheck.deleteMany({ monitorId });
		console.log("deleted hardware checks", result);
		return result.deletedCount;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "deleteHardwareChecksByMonitorId";
		throw error;
	}
};

export { createHardwareCheck, deleteHardwareChecksByMonitorId };
