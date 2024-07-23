import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Box, Stack } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import "./index.css";

/**
 * Icons mapping for different alert variants.
 * @type {Object<string, JSX.Element>}
 */

const icons = {
  info: <InfoOutlinedIcon />,
  error: <ErrorOutlineOutlinedIcon />,
  warning: <WarningAmberOutlinedIcon />,
};

/**
 * @param {Object} props
 * @param {'info' | 'error' | 'warning'} props.variant - The type of alert.
 * @param {string} [props.title] - The title of the alert.
 * @param {string} [props.body] - The body text of the alert.
 * @returns {JSX.Element}
 */

const Alert = ({ variant, title, body }) => {
  const theme = useTheme();
  const { bg, border, color } = theme.alert[variant];
  const icon = icons[variant];

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      className="alert row-stack"
      gap={theme.gap.ml}
      sx={{
        backgroundColor: bg,
        border: `solid 1px ${border}`,
        borderRadius: `${theme.shape.borderRadius}px`,
      }}
    >
      {icon && <Box sx={{ color: color }}>{icon}</Box>}
      <Stack direction="column" gap="2px" sx={{ flex: 1, color: color }}>
        {title && <Box sx={{ fontWeight: "700" }}>{title}</Box>}
        {body && <Box sx={{ fontWeight: "400" }}>{body}</Box>}
      </Stack>
    </Stack>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(["info", "error", "warning"]).isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Alert;
