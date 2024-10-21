import UserModel from "../../models/User.js";
import RecoveryToken from "../../models/RecoveryToken.js";
import crypto from "crypto";
import { errorMessages } from "../../../utils/messages.js";

const SERVICE_NAME = "recoveryModule";

/**
 * Request a recovery token
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
const requestRecoveryToken = async (req, res) => {
	try {
		// Delete any existing tokens
		await RecoveryToken.deleteMany({ email: req.body.email });
		let recoveryToken = new RecoveryToken({
			email: req.body.email,
			token: crypto.randomBytes(32).toString("hex"),
		});
		await recoveryToken.save();
		return recoveryToken;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "requestRecoveryToken";
		throw error;
	}
};

const validateRecoveryToken = async (req, res) => {
	try {
		const candidateToken = req.body.recoveryToken;
		const recoveryToken = await RecoveryToken.findOne({
			token: candidateToken,
		});
		if (recoveryToken !== null) {
			return recoveryToken;
		} else {
			throw new Error(errorMessages.DB_TOKEN_NOT_FOUND);
		}
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "validateRecoveryToken";
		throw error;
	}
};

const resetPassword = async (req, res) => {
	try {
		const newPassword = req.body.password;

		// Validate token again
		const recoveryToken = await validateRecoveryToken(req, res);
		const user = await UserModel.findOne({ email: recoveryToken.email });

		const match = await user.comparePassword(newPassword);
		if (match === true) {
			throw new Error(errorMessages.DB_RESET_PASSWORD_BAD_MATCH);
		}

		if (user !== null) {
			user.password = newPassword;
			await user.save();
			await RecoveryToken.deleteMany({ email: recoveryToken.email });
			// Fetch the user again without the password
			const userWithoutPassword = await UserModel.findOne({
				email: recoveryToken.email,
			})
				.select("-password")
				.select("-profileImage");
			return userWithoutPassword;
		} else {
			throw new Error(errorMessages.DB_USER_NOT_FOUND);
		}
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "resetPassword";
		throw error;
	}
};

export { requestRecoveryToken, validateRecoveryToken, resetPassword };
