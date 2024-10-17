/**
 * Helper function to get duration since last check or the last date checked
 * @param {Array} checks Array of check objects.
 * @param {boolean} duration Whether the function should return the duration since last checked or the date itself
 * @returns {number} Timestamp of the most recent check.
 */
export const getLastChecked = (checks, duration = true) => {
	if (!checks || checks.length === 0) {
		return 0; // Handle case when no checks are available
	}

	// Data is sorted newest -> oldest, so newest check is the most recent
	if (!duration) {
		return new Date(checks[0].createdAt);
	}
	return new Date() - new Date(checks[0].createdAt);
};
