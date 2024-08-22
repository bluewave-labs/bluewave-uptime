import PropTypes from "prop-types";
import { Box, Stack } from "@mui/material";

/**
 * A component that renders a pulsating dot with a specified color.
 *
 * @component
 * @example
 * // Example usage:
 * <PulseDot color="#f00" />
 *
 * @param {Object} props
 * @param {string} props.color - The color of the dot.
 * @returns {JSX.Element} The PulseDot component.
 */

const PulseDot = ({ color }) => {
  return (
    <Stack
      width="26px"
      height="24px"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="14px"
        height="14px"
        sx={{
          position: "relative",
          backgroundColor: color,
          borderRadius: "50%",
          "&::before": {
            content: `""`,
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "inherit",
            borderRadius: "50%",
            animation: "ripple 1.8s ease-out infinite",
          },
        }}
      />
    </Stack>
  );
};

PulseDot.propTypes = {
  color: PropTypes.string.isRequired,
};

export default PulseDot;
