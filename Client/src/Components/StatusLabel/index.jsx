import "./index.css";
import PropTypes from "prop-types";

/**
 * Status component.
 * This subcomponent receives a params object and displays the status details of a monitor.
 *
 * @component
 * @param {Object} params - An object containing the following properties:
 * @param {string} params.backgroundColor - The background color of the status box.
 * @param {string} params.statusDotColor - The color of the status dot.
 * @param {string} params.status - The status text to display.
 * @returns {React.ElementType} Returns a div element with the host status.
 */
const StatusLabel = ({ params }) => {
  return (
    <div className="host-status">
      <div
        className="host-status-details"
        style={{ backgroundColor: params.backgroundColor }}
      >
        <div
          className="host-status-dot"
          style={{ backgroundColor: params.statusDotColor }}
        />
        <span
          className="host-status-text"
          style={{ textTransform: "capitalize" }}
        >
          {params.status}
        </span>
      </div>
    </div>
  );
};

export default StatusLabel;

StatusLabel.propTypes = { params: PropTypes.object.isRequired };
