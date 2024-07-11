import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Box, IconButton, Stack } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";
import Button from "../Button";

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

const Alert = ({ variant, title, body, toast, hasIcon = true, onClick }) => {
  const theme = useTheme();
  const { bg, border, color } = theme.alert[variant];
  const icon = icons[variant];

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems={hasIcon ? "" : "center"}
      className="alert row-stack"
      gap={theme.gap.ml}
      sx={{
        padding: hasIcon ? theme.gap.ml : `${theme.gap.small} ${theme.gap.ml}`,
        backgroundColor: bg,
        border: `solid 1px ${border}`,
        borderRadius: `${theme.shape.borderRadius}px`,
      }}
    >
      {hasIcon && <Box sx={{ color: color }}>{icon}</Box>}
      <Stack direction="column" gap="2px" sx={{ flex: 1, color: color }}>
        {title && <Box sx={{ fontWeight: "700" }}>{title}</Box>}
        {body && <Box sx={{ fontWeight: "400" }}>{body}</Box>}
        {hasIcon && toast && (
          <Button
            level="tertiary"
            label="Dismiss"
            onClick={onClick}
            sx={{
              fontWeight: "600",
              width: "fit-content",
              mt: theme.gap.small,
              padding: 0,
              minWidth: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
              "& .MuiTouchRipple-root": {
                pointerEvents: "none",
                display: "none",
              },
            }}
          ></Button>
        )}
      </Stack>
      {toast && (
        <IconButton
          onClick={onClick}
          sx={{
            alignSelf: "flex-start",
            ml: "auto",
            mr: "-5px",
            mt: hasIcon ? "-5px" : 0,
            padding: "5px",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <CloseIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
      )}
    </Stack>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(["info", "error", "warning"]).isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Alert;
