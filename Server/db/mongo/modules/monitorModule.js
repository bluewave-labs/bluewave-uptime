import Monitor from "../../models/Monitor.js";
import Check from "../../models/Check.js";
import PageSpeedCheck from "../../models/PageSpeedCheck.js";
import { errorMessages } from "../../../utils/messages.js";
import Notification from "../../models/Notification.js";
import { NormalizeData } from "../../../utils/dataUtils.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const demoMonitorsPath = path.resolve(__dirname, "../../../utils/demoMonitors.json");
const demoMonitors = JSON.parse(fs.readFileSync(demoMonitorsPath, "utf8"));

const SERVICE_NAME = "monitorModule";

/**
 * Get all monitors
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Array<Monitor>>}
 * @throws {Error}
 */
const getAllMonitors = async (req, res) => {
	try {
		const monitors = await Monitor.find();
		return monitors;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "getAllMonitors";
		throw error;
	}
};

/**
 * Function to calculate uptime duration based on the most recent check.
 * @param {Array} checks Array of check objects.
 * @returns {number} Uptime duration in ms.
 */
const calculateUptimeDuration = (checks) => {
	if (!checks || checks.length === 0) {
		return 0;
	}

	const latestCheck = new Date(checks[0].createdAt);
	let latestDownCheck = 0;

	for (let i = checks.length; i <= 0; i--) {
		if (checks[i].status === false) {
			latestDownCheck = new Date(checks[i].createdAt);
			break;
		}
	}

	// If no down check is found, uptime is from the last check to now
	if (latestDownCheck === 0) {
		return Date.now() - new Date(checks[checks.length - 1].createdAt);
	}

	// Otherwise the uptime is from the last check to the last down check
	return latestCheck - latestDownCheck;
};

/**
 * Helper function to get duration since last check
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */
const getLastChecked = (checks) => {
	if (!checks || checks.length === 0) {
		return 0; // Handle case when no checks are available
	}
	// Data is sorted newest->oldest, so last check is the most recent
	return new Date() - new Date(checks[0].createdAt);
};

/**
 * Helper function to get latestResponseTime
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */
const getLatestResponseTime = (checks) => {
	if (!checks || checks.length === 0) {
		return 0;
	}
	return checks[0].responseTime;
};

/**
 * Helper function to get average response time
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */
const getAverageResponseTime = (checks) => {
	if (!checks || checks.length === 0) {
		return 0;
	}
	const aggResponseTime = checks.reduce((sum, check) => {
		return sum + check.responseTime;
	}, 0);
	return aggResponseTime / checks.length;
};

/**
 * Helper function to get precentage 24h uptime
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */

const getUptimePercentage = (checks) => {
	if (!checks || checks.length === 0) {
		return 0;
	}
	const upCount = checks.reduce((count, check) => {
		return check.status === true ? count + 1 : count;
	}, 0);
	return (upCount / checks.length) * 100;
};

/**
 * Helper function to get all incidents
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */

const getIncidents = (checks) => {
	if (!checks || checks.length === 0) {
		return 0; // Handle case when no checks are available
	}
	return checks.reduce((acc, check) => {
		return check.status === false ? (acc += 1) : acc;
	}, 0);
};

/**
 * Get stats by monitor ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const getMonitorStatsById = async (req) => {
	const startDates = {
		day: new Date(new Date().setDate(new Date().getDate() - 1)),
		week: new Date(new Date().setDate(new Date().getDate() - 7)),
		month: new Date(new Date().setMonth(new Date().getMonth() - 1)),
	};
	const endDate = new Date();
	try {
		// Get monitor
		const { monitorId } = req.params;
		let { limit, sortOrder, dateRange, numToDisplay, normalize } = req.query;
		const monitor = await Monitor.findById(monitorId);
		if (monitor === null || monitor === undefined) {
			throw new Error(errorMessages.DB_FIND_MONITOR_BY_ID(monitorId));
		}
		// This effectively removes limit, returning all checks
		if (limit === undefined) limit = 0;
		// Default sort order is newest -> oldest
		sortOrder = sortOrder === "asc" ? 1 : -1;

		let model =
			monitor.type === "http" || monitor.type === "ping" ? Check : PageSpeedCheck;

		const monitorStats = {
			...monitor.toObject(),
		};

		// Build checks query
		const checksQuery = { monitorId: monitor._id };

		// Get all checks
		const checksAll = await model.find(checksQuery).sort({
			createdAt: sortOrder,
		});

		const checksQueryForDateRange = {
			...checksQuery,
			createdAt: {
				$gte: startDates[dateRange],
				$lte: endDate,
			},
		};

		const checksForDateRange = await model
			.find(checksQueryForDateRange)
			.sort({ createdAt: sortOrder });

		if (monitor.type === "http" || monitor.type === "ping") {
			// HTTP/PING Specific stats
			monitorStats.periodAvgResponseTime = getAverageResponseTime(checksForDateRange);
			monitorStats.periodUptime = getUptimePercentage(checksForDateRange);

			// Aggregate data
			let groupedChecks;
			// Group checks by hour if range is day
			if (dateRange === "day") {
				groupedChecks = checksForDateRange.reduce((acc, check) => {
					const time = new Date(check.createdAt);
					time.setMinutes(0, 0, 0);
					if (!acc[time]) {
						acc[time] = { time, checks: [] };
					}
					acc[time].checks.push(check);
					return acc;
				}, {});
			} else {
				groupedChecks = checksForDateRange.reduce((acc, check) => {
					const time = new Date(check.createdAt).toISOString().split("T")[0]; // Extract the date part
					if (!acc[time]) {
						acc[time] = { time, checks: [] };
					}
					acc[time].checks.push(check);
					return acc;
				}, {});
			}

			// Map grouped checks to stats
			const aggregateData = Object.values(groupedChecks).map((group) => {
				const totalChecks = group.checks.length;
				const uptimePercentage = getUptimePercentage(group.checks);
				const totalIncidents = group.checks.filter(
					(check) => check.status === false
				).length;
				const avgResponseTime =
					group.checks.reduce((sum, check) => sum + check.responseTime, 0) / totalChecks;

				return {
					time: group.time,
					uptimePercentage,
					totalChecks,
					totalIncidents,
					avgResponseTime,
				};
			});
			monitorStats.aggregateData = aggregateData;
		}

		monitorStats.periodIncidents = getIncidents(checksForDateRange);
		monitorStats.periodTotalChecks = checksForDateRange.length;

		// If more than numToDisplay checks, pick every nth check

		let nthChecks = checksForDateRange;

		if (
			numToDisplay !== undefined &&
			checksForDateRange &&
			checksForDateRange.length > numToDisplay
		) {
			const n = Math.ceil(checksForDateRange.length / numToDisplay);
			nthChecks = checksForDateRange.filter((_, index) => index % n === 0);
		}

		// Normalize checks if requested
		if (normalize !== undefined) {
			const normailzedChecks = NormalizeData(nthChecks, 1, 100);
			monitorStats.checks = normailzedChecks;
		} else {
			monitorStats.checks = nthChecks;
		}

		monitorStats.uptimeDuration = calculateUptimeDuration(checksAll);
		monitorStats.lastChecked = getLastChecked(checksAll);
		monitorStats.latestResponseTime = getLatestResponseTime(checksAll);

		return monitorStats;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "getMonitorStatsById";
		throw error;
	}
};

/**
 * Get a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const getMonitorById = async (monitorId) => {
	try {
		const monitor = await Monitor.findById(monitorId);
		if (monitor === null || monitor === undefined) {
			const error = new Error(errorMessages.DB_FIND_MONITOR_BY_ID(monitorId));
			error.status = 404;
			throw error;
		}
		// Get notifications
		const notifications = await Notification.find({
			monitorId: monitorId,
		});
		const updatedMonitor = await Monitor.findByIdAndUpdate(
			monitorId,
			{ notifications },
			{ new: true }
		).populate("notifications");
		return updatedMonitor;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "getMonitorById";
		throw error;
	}
};

/**
 * Get monitors and Summary by TeamID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Array<Monitor>>}
 * @throws {Error}
 */

const getMonitorsAndSummaryByTeamId = async (teamId, type) => {
	try {
		const monitors = await Monitor.find({ teamId, type });
		const monitorCounts = monitors.reduce(
			(acc, monitor) => {
				if (monitor.status === true) {
					acc.up += 1;
				}

				if (monitor.status === false) {
					acc.down += 1;
				}

				if (monitor.isActive === false) {
					acc.paused += 1;
				}
				return acc;
			},
			{ up: 0, down: 0, paused: 0 }
		);
		monitorCounts.total = monitors.length;
		return { monitors, monitorCounts };
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "getMonitorsAndSummaryByTeamId";
		throw error;
	}
};

/**
 * Get monitors by TeamID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Array<Monitor>>}
 * @throws {Error}
 */
const getMonitorsByTeamId = async (req, res) => {
	try {
		let {
			limit,
			type,
			status,
			checkOrder,
			normalize,
			page,
			rowsPerPage,
			filter,
			field,
			order,
		} = req.query || {};
		const monitorQuery = { teamId: req.params.teamId };
		if (type !== undefined) {
			monitorQuery.type = type;
		}
		// Add filter if provided
		// $options: "i" makes the search case-insensitive
		if (filter !== undefined) {
			monitorQuery.$or = [
				{ name: { $regex: filter, $options: "i" } },
				{ url: { $regex: filter, $options: "i" } },
			];
		}
		const monitorsCount = await Monitor.countDocuments(monitorQuery);

		// Pagination
		let skip = 0;
		if (page && rowsPerPage) {
			skip = page * rowsPerPage;
		}

		if (type !== undefined) {
			const types = Array.isArray(type) ? type : [type];
			monitorQuery.type = { $in: types };
		}

		// Default sort order is newest -> oldest
		if (checkOrder === "asc") {
			checkOrder = 1;
		} else if (checkOrder === "desc") {
			checkOrder = -1;
		} else checkOrder = -1;

		// Sort order for monitors
		let sort = {};
		if (field !== undefined && order !== undefined) {
			sort[field] = order === "asc" ? 1 : -1;
		}

		const monitors = await Monitor.find(monitorQuery)
			.skip(skip)
			.limit(rowsPerPage)
			.sort(sort);

		// Early return if limit is set to -1, indicating we don't want any checks
		if (limit === "-1") {
			return { monitors, monitorCount: monitorsCount };
		}

		// This effectively removes limit, returning all checks
		if (limit === undefined) limit = 0;

		// Map each monitor to include its associated checks
		const monitorsWithChecks = await Promise.all(
			monitors.map(async (monitor) => {
				const checksQuery = { monitorId: monitor._id };
				if (status !== undefined) {
					checksQuery.status = status;
				}

				let model =
					monitor.type === "http" || monitor.type === "ping" ? Check : PageSpeedCheck;

				// Checks are order newest -> oldest
				let checks = await model
					.find(checksQuery)
					.sort({
						createdAt: checkOrder,
					})
					.limit(limit);

				//Normalize checks if requested
				if (normalize !== undefined) {
					checks = NormalizeData(checks, 10, 100);
				}
				return { ...monitor.toObject(), checks };
			})
		);
		return { monitors: monitorsWithChecks, monitorCount: monitorsCount };
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "getMonitorsByTeamId";
		throw error;
	}
};

/**
 * Create a monitor
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const createMonitor = async (req, res) => {
	try {
		const monitor = new Monitor({ ...req.body });
		// Remove notifications fom monitor as they aren't needed here
		monitor.notifications = undefined;
		await monitor.save();
		return monitor;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "createMonitor";
		throw error;
	}
};

/**
 * Delete a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const deleteMonitor = async (req, res) => {
	const monitorId = req.params.monitorId;
	try {
		const monitor = await Monitor.findByIdAndDelete(monitorId);
		if (!monitor) {
			throw new Error(errorMessages.DB_FIND_MONITOR_BY_ID(monitorId));
		}
		return monitor;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "deleteMonitor";
		throw error;
	}
};

/**
 * DELETE ALL MONITORS (TEMP)
 */

const deleteAllMonitors = async (teamId) => {
	try {
		const monitors = await Monitor.find({ teamId });
		const { deletedCount } = await Monitor.deleteMany({ teamId });

		return { monitors, deletedCount };
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "deleteAllMonitors";
		throw error;
	}
};

/**
 * Delete all monitors associated with a user ID
 * @async
 * @param {string} userId - The ID of the user whose monitors are to be deleted.
 * @returns {Promise} A promise that resolves when the operation is complete.
 */
const deleteMonitorsByUserId = async (userId) => {
	try {
		const result = await Monitor.deleteMany({ userId: userId });
		return result;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "deleteMonitorsByUserId";
		throw error;
	}
};

/**
 * Edit a monitor by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<Monitor>}
 * @throws {Error}
 */
const editMonitor = async (candidateId, candidateMonitor) => {
	candidateMonitor.notifications = undefined;

	try {
		const editedMonitor = await Monitor.findByIdAndUpdate(candidateId, candidateMonitor, {
			new: true,
		});
		return editedMonitor;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "editMonitor";
		throw error;
	}
};

const addDemoMonitors = async (userId, teamId) => {
	try {
		const demoMonitorsToInsert = demoMonitors.map((monitor) => {
			return {
				userId,
				teamId,
				name: monitor.name,
				description: monitor.name,
				type: "http",
				url: monitor.url,
				interval: 60000,
			};
		});
		const insertedMonitors = await Monitor.insertMany(demoMonitorsToInsert);
		return insertedMonitors;
	} catch (error) {
		error.service = SERVICE_NAME;
		error.method = "addDemoMonitors";
		throw error;
	}
};

export {
	getAllMonitors,
	getMonitorStatsById,
	getMonitorById,
	getMonitorsAndSummaryByTeamId,
	getMonitorsByTeamId,
	createMonitor,
	deleteMonitor,
	deleteAllMonitors,
	deleteMonitorsByUserId,
	editMonitor,
	addDemoMonitors,
};
