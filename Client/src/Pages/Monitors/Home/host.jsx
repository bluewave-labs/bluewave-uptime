import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
/**
 * Host component.
 * This subcomponent receives a params object and displays the host details.
 *
 * @component
 * @param {Object} params - An object containing the following properties:
 * @param {string} params.title - The name of the host.
 * @param {string} params.percentageColor - The color of the percentage text.
 * @param {number} params.percentage - The percentage to display.
 * @returns {React.ElementType} Returns a div element with the host details.
 */
const Host = ({ params }) => {
  return (
    <Stack direction="row" alignItems="baseline" className="host">
      {params.title}
      <Typography component="span" sx={{ color: params.percentageColor }}>
        {params.percentage}%
      </Typography>
    </Stack>
  );
};

Host.propTypes = {
  params: PropTypes.shape({
    title: PropTypes.string,
    percentageColor: PropTypes.string,
    percentage: PropTypes.number,
  }).isRequired,
};

export default Host;
