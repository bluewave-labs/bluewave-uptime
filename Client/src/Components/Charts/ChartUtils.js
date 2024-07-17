const RANGE_MAX = 100;
const RANGE_MIN = 1;

const calculatePercentile = (arr, percentile) => {
  const sorted = arr.slice().sort((a, b) => a.responseTime - b.responseTime);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = lower + 1;
  const weight = index % 1;
  if (upper >= sorted.length) return sorted[lower].responseTime;
  return (
    sorted[lower].responseTime * (1 - weight) +
    sorted[upper].responseTime * weight
  );
};

export const NormalizeData = (checks) => {
  if (checks.length > 1) {
    // Get the 5th and 95th percentile
    const min = calculatePercentile(checks, 5);
    const max = calculatePercentile(checks, 95);

    const normalizedChecks = checks.map((check) => {
      // Normalize the response time between 1 and 100
      let normalizedResponseTime =
        RANGE_MIN +
        ((check.responseTime - min) * (RANGE_MAX - RANGE_MIN)) / (max - min);

      // Put a floor on the response times so we don't have extreme outliers
      // Better visuals
      normalizedResponseTime = Math.max(
        RANGE_MIN,
        Math.min(RANGE_MAX, normalizedResponseTime)
      );
      return {
        ...check,
        responseTime: normalizedResponseTime,
      };
    });

    return normalizedChecks;
  } else {
    return checks;
  }
};
