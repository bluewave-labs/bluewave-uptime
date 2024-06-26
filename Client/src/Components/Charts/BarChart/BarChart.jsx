import "./barChart.css";
import PropTypes from "prop-types";

const RANGE_MAX = 100;
const RANGE_MIN = 1;

/**
 * Normalizes the response times of a set of checks to a specified range.
 * This function calculates the minimum and maximum response times from the input,
 * then scales each check's response time linearly between `RANGE_MIN` and `RANGE_MAX`.
 *
 * @param {Array<Checks>} checks - An array of check objects. Each check should have a `responseTime` property.
 * @returns {Array<Checks>} An array of check objects with normalized `responseTime` values.
 */
const normalizeData = (checks) => {
  const min = checks.reduce((accum, cur) => {
    return Math.min(accum, cur.responseTime);
  }, Infinity);

  const max = checks.reduce((accum, cur) => {
    return Math.max(accum, cur.responseTime);
  }, 0);

  const normalizedChecks = checks.map((check) => {
    let normailzedResponseTime =
      RANGE_MIN +
      ((check.responseTime - min) * (RANGE_MAX - RANGE_MIN)) / (max - min);
    const normalizedCheck = { ...check, responseTime: normailzedResponseTime };
    return normalizedCheck;
  });
  return normalizedChecks;
};

/**
 * BarChart renders a bar chart visualization for a set of checks. Each bar represents a check's response time,
 * with the color indicating the check's status (green for successful checks, red for failed ones).
 *
 * @component
 * @param {Array<Checks>} checks - An array of check objects to be visualized. Each check object should have an `_id`,
 * a `status` indicating success (true) or failure (false), and a `responseTime` representing the height of the bar in percentage.
 */
const BarChart = ({ checks = [] }) => {
  const normailzedChecks = normalizeData(checks);
  return (
    <div className="bar-chart">
      {normailzedChecks.map((check) => {
        return (
          <div
            key={check._id}
            className={`bar ${check.status ? "green" : "red"}`}
            style={{ height: `${check.responseTime}%` }}
          />
        );
      })}
    </div>
  );
};

BarChart.propTypes = {
  checks: PropTypes.array,
};

export default BarChart;
