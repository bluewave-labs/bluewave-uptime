const calculatePercentile = (arr, percentile) => {
	const sorted = arr.slice().sort((a, b) => a.responseTime - b.responseTime);
	const index = (percentile / 100) * (sorted.length - 1);
	const lower = Math.floor(index);
	const upper = lower + 1;
	const weight = index % 1;
	if (upper >= sorted.length) return sorted[lower].responseTime;
	return sorted[lower].responseTime * (1 - weight) + sorted[upper].responseTime * weight;
};

const NormalizeData = (checks, rangeMin, rangeMax) => {
	if (checks.length > 1) {
		// Get the 5th and 95th percentile
		const min = calculatePercentile(checks, 0);
		const max = calculatePercentile(checks, 95);

		const normalizedChecks = checks.map((check) => {
			const originalResponseTime = check.responseTime;
			// Normalize the response time between 1 and 100
			let normalizedResponseTime =
				rangeMin + ((check.responseTime - min) * (rangeMax - rangeMin)) / (max - min);

			// Put a floor on the response times so we don't have extreme outliers
			// Better visuals
			normalizedResponseTime = Math.max(
				rangeMin,
				Math.min(rangeMax, normalizedResponseTime)
			);
			return {
				...check._doc,
				responseTime: normalizedResponseTime,
				originalResponseTime: originalResponseTime,
			};
		});

		return normalizedChecks;
	} else {
		return checks.map((check) => {
			return { ...check._doc, originalResponseTime: check.responseTime };
		});
	}
};

export { calculatePercentile, NormalizeData };
