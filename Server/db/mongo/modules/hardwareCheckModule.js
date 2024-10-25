import HardwareCheck from "../../models/HardwareCheck.js";
const SERVICE_NAME = "hardwareCheckModule";
const createHardwareCheck = async (hardwareCheckData) => {
	try {
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
