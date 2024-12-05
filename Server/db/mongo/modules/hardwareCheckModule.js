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

		if (monitor.uptimePercentage === undefined) {
			monitor.uptimePercentage = status === true ? 1 : 0;
		} else {
			monitor.uptimePercentage =
				(monitor.uptimePercentage * (n - 1) + (status === true ? 1 : 0)) / n;
		}
		await monitor.save();
		const hardwareCheck = await new HardwareCheck({
			...hardwareCheckData,
		}).save();
		return hardwareCheck;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "createHardwareCheck";
		throw error;
	}
};

export { createHardwareCheck };
