import {
	registrationBodyValidation,
	loginValidation,
	editUserParamValidation,
	editUserBodyValidation,
	recoveryValidation,
	recoveryTokenValidation,
	newPasswordValidation,
} from "../validation/joi.js";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
import { errorMessages, successMessages } from "../utils/messages.js";
import jwt from "jsonwebtoken";
import { getTokenFromHeaders, tokenType } from "../utils/utils.js";
import crypto from "crypto";
import { handleValidationError, handleError } from "./controllerUtils.js";

dotenv.config();
const SERVICE_NAME = "authController";

/**
 * Issues a JWT token based on token type and app settings
 */
const issueToken = (payload, typeOfToken, appSettings) => {
	try {
		const tokenTTL = typeOfToken === tokenType.REFRESH_TOKEN
			? appSettings?.refreshTokenTTL ?? "7d"
			: appSettings?.jwtTTL ?? "2h";

		const tokenSecret = typeOfToken === tokenType.REFRESH_TOKEN
			? appSettings?.refreshTokenSecret
			: appSettings?.jwtSecret;

		return jwt.sign(typeOfToken === tokenType.REFRESH_TOKEN ? {} : payload, tokenSecret, { expiresIn: tokenTTL });
	} catch (error) {
		throw handleError(error, SERVICE_NAME, "issueToken");
	}
};

/**
 * Registers a new user.
 */
const registerUser = async (req, res, next) => {
	try {
		await registrationBodyValidation.validateAsync(req.body);

		const { inviteToken } = req.body;
		const superAdminExists = await req.db.checkSuperadmin(req, res);

		if (superAdminExists) {
			await req.db.getInviteTokenAndDelete(inviteToken);
		} else {
			const jwtSecret = crypto.randomBytes(64).toString("hex");
			await req.db.updateAppSettings({ jwtSecret });
		}

		const newUser = await req.db.insertUser({ ...req.body }, req.file);
		logger.info(successMessages.AUTH_CREATE_USER, { service: SERVICE_NAME, userId: newUser._id });

		const { jwtSecret, refreshTokenSecret, jwtTTL, refreshTokenTTL } = await req.settingsService.getSettings();
		const token = issueToken(newUser._doc, tokenType.ACCESS_TOKEN, { jwtSecret, jwtTTL });
		const refreshToken = issueToken({}, tokenType.REFRESH_TOKEN, { refreshTokenSecret, refreshTokenTTL });

		await req.emailService.buildAndSendEmail(
			"welcomeEmailTemplate",
			{ name: newUser.firstName },
			newUser.email,
			"Welcome to Uptime Monitor"
		);

		res.status(200).json({
			success: true,
			msg: successMessages.AUTH_CREATE_USER,
			data: { user: newUser, token, refreshToken }
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "registerUser"));
	}
};

/**
 * Logs in a user and issues a JWT token.
 */
const loginUser = async (req, res, next) => {
	try {
		await loginValidation.validateAsync(req.body);

		const { email, password } = req.body;
		const user = await req.db.getUserByEmail(email);

		if (!(await user.comparePassword(password))) {
			throw new Error(errorMessages.AUTH_INCORRECT_PASSWORD);
		}

		const userWithoutPassword = { ...user._doc };
		delete userWithoutPassword.password;
		delete userWithoutPassword.avatarImage;

		const appSettings = await req.settingsService.getSettings();
		const token = issueToken(userWithoutPassword, tokenType.ACCESS_TOKEN, appSettings);
		const refreshToken = issueToken({}, tokenType.REFRESH_TOKEN, appSettings);

		res.status(200).json({
			success: true,
			msg: successMessages.AUTH_LOGIN_USER,
			data: { user: userWithoutPassword, token, refreshToken },
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "loginUser"));
	}
};

/**
 * Edits a user's information and handles password update.
 */
const editUser = async (req, res, next) => {
	try {
		await Promise.all([
			editUserParamValidation.validateAsync(req.params),
			editUserBodyValidation.validateAsync(req.body),
		]);

		if (req.params.userId !== req.user._id.toString()) {
			throw new Error(errorMessages.AUTH_UNAUTHORIZED);
		}

		if (req.body.password && req.body.newPassword) {
			const token = getTokenFromHeaders(req.headers);
			const { email } = jwt.verify(token, await req.settingsService.getSettings().jwtSecret);
			const user = await req.db.getUserByEmail(email);

			if (!(await user.comparePassword(req.body.password))) {
				throw new Error(errorMessages.AUTH_INCORRECT_PASSWORD);
			}
			req.body.password = req.body.newPassword;
		}

		const updatedUser = await req.db.updateUser(req, res);
		res.status(200).json({
			success: true,
			msg: successMessages.AUTH_UPDATE_USER,
			data: updatedUser,
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "editUser"));
	}
};

/**
 * Requests a password recovery token.
 */
const requestRecovery = async (req, res, next) => {
	try {
		await recoveryValidation.validateAsync(req.body);

		const user = await req.db.getUserByEmail(req.body.email);
		if (user) {
			const recoveryToken = await req.db.requestRecoveryToken(req, res);
			const { clientHost } = await req.settingsService.getSettings();
			const url = `${clientHost}/set-new-password/${recoveryToken.token}`;

			const msgId = await req.emailService.buildAndSendEmail(
				"passwordResetTemplate",
				{ name: user.firstName, email: req.body.email, url },
				req.body.email,
				"Bluewave Uptime Password Reset"
			);

			res.status(200).json({
				success: true,
				msg: successMessages.AUTH_CREATE_RECOVERY_TOKEN,
				data: msgId,
			});
		} else {
			throw new Error(errorMessages.FRIENDLY_ERROR);
		}
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "requestRecovery"));
	}
};

/**
 * Resets a user's password and issues a new JWT token.
 */
const resetPassword = async (req, res, next) => {
	try {
		await newPasswordValidation.validateAsync(req.body);

		const user = await req.db.resetPassword(req, res);
		const token = issueToken(user._doc, tokenType.ACCESS_TOKEN, await req.settingsService.getSettings());

		res.status(200).json({
			success: true,
			msg: successMessages.AUTH_RESET_PASSWORD,
			data: { user, token },
		});
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "resetPassword"));
	}
};

/**
 * Deletes a user and all associated data.
 */
const deleteUser = async (req, res, next) => {
	try {
		const token = getTokenFromHeaders(req.headers);
		const { email } = jwt.decode(token);
		const user = await req.db.getUserByEmail(email);

		if (!user) throw new Error(errorMessages.DB_USER_NOT_FOUND);

		const teamMonitors = await req.db.getMonitorsByTeamId({ params: { teamId: user.teamId } });

		if (user.role.includes("superadmin")) {
			await Promise.all(
				teamMonitors?.monitors.map(async (monitor) => {
					await req.jobQueue.deleteJob(monitor);
					await req.db.deleteChecks(monitor._id);
					await req.db.deletePageSpeedChecksByMonitorId(monitor._id);
					await req.db.deleteNotificationsByMonitorId(monitor._id);
				})
			);

			await req.db.deleteTeam(user.teamId);
			await req.db.deleteAllOtherUsers();
			await req.db.deleteMonitorsByUserId(user._id);
		}

		await req.db.deleteUser(user._id);

		res.status(200).json({ success: true, msg: successMessages.AUTH_DELETE_USER });
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "deleteUser"));
	}
};

/**
 * Gets all users from the database.
 */
const getAllUsers = async (req, res, next) => {
	try {
		const allUsers = await req.db.getAllUsers(req, res);
		res.status(200).json({ success: true, msg: "Got all users", data: allUsers });
	} catch (error) {
		next(handleError(error, SERVICE_NAME, "getAllUsers"));
	}
};

export {
	issueToken,
	registerUser,
	loginUser,
	editUser,
	requestRecovery,
	resetPassword,
	deleteUser,
	getAllUsers,
};
