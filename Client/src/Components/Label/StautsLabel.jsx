import PropTypes from "prop-types";
import BaseLabel from "./BaseLabel";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

/**
 * @component
 * @param {Object} props
 * @param {'Seen' | 'Waiting' | 'New' | 'Active'} props.status - The status for the label
 * @returns {JSX.Element}
 * @example
 * // Render an active label
 * <StatusLabel status="Active" />
 */

const StatusLabel = ({ status }) => {
  const theme = useTheme();

  const colorLookup = {
    Seen: theme.palette.labelGray.color,
    Waiting: theme.palette.labelRed.color,
    New: theme.palette.labelOrange.color,
    Active: theme.palette.labelGreen.color,
  };

  // Look up the color for the status, default to labelGray if not found
  const color = colorLookup[status] || theme.palette.labelGray.color;

  return (
    <BaseLabel label={status}>
      <Box
        width={12}
        height={12}
        bgcolor={color}
        borderRadius="50%"
        marginRight={1}
      />
    </BaseLabel>
  );
};

StatusLabel.propTypes = {
  status: PropTypes.oneOf(["Seen", "Waiting", "New", "Active"]),
};

export default StatusLabel;
