import "./announcementsMessageBar.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

/**
 * @component
 * @param {Object} props
 * @param {string} props.message - The announcement message text content (required)
 * @returns {JSX.Element} - Renders the announcement message bar component
 */
const AnnouncementsMessageBar = ({ message }) => {
  return (
    <div className="announcement-tile">
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
