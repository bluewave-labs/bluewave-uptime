import "./announcementsMessageBar.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

function AnnouncementsMessageBar({ message }) {
  return (
    <div className="announcement-tile">
      <div className="announcement-messagebar-body">{message}</div>
      <div className="announcement-close">
        <CloseIcon style={{ fill: "#98A2B3" }} />
      </div>
    </div>
  );
}

AnnouncementsMessageBar.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AnnouncementsMessageBar;
