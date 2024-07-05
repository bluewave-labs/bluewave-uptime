import "./announcementsMessageBar.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

/**
 * @component
 * @param {Object} props
 * @param {string} props.message - The announcement message text content (required)
 * @returns {JSX.Element} - Renders the announcement message bar component
 */
const AnnouncementsMessageBar = ({ message }) => {
  const theme = useTheme();

  const fontLookup = {
    default: theme.font.default.font,
  };

  const fontFamily = fontLookup["default"];

  return (
    <div className="announcement-tile" style={{ fontFamily: fontFamily }}>
      <div className="announcement-messagebar-body">{message}</div>
      <div className="announcement-close">
        <CloseIcon style={{ fill: "#98A2B3" }} />
      </div>
    </div>
  );
};

AnnouncementsMessageBar.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AnnouncementsMessageBar;
