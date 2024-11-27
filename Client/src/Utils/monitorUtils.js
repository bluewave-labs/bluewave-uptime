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

export const parseDomainName = (url) => {
	url = url.replace(/^https?:\/\//, "");
	// Remove leading/trailing dots
	url = url.replace(/^\.+|\.+$/g, "");
	// Split by dots
	const parts = url.split(".");
	// Remove common prefixes and empty parts
	const cleanParts = parts.filter((part) => part !== "www" && part !== "");
	if (cleanParts.length > 2) {
		// Don't know how to parse this, return URL
		return url;
	}
	// If there's more than one part, take the second to last
	const domainPart =
		cleanParts.length > 1
			? cleanParts[cleanParts.length - 2]
			: cleanParts[cleanParts.length - 1];

	if (domainPart) {
		return domainPart.charAt(0).toUpperCase() + domainPart.slice(1).toLowerCase();
	}

	return url;
};
