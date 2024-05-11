import "./announcementsDualButton.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const AnnouncementsDualButton = ({ subject, body, esc, primary }) => {
  return (
    <div className="announcement-without-tile">
      <div className="announcement-without-content">
        <div className="announcement-without-content-subject">{subject}</div>
        <div className="v-spacing"></div>
        <div className="announcement-without-content-body">{body}</div>
        <div className="announcement-content-controllers">
          <div className="controllers-button-esc">{esc}</div>
          <div className="controllers-button-primary">{primary}</div>
        </div>
      </div>
      <div className="h-spacing"></div>
      <div className="announcement-close">
        <CloseIcon style={{ fill: "#98A2B3" }} />
      </div>
    </div>
  );
};

AnnouncementsDualButton.propTypes = {
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  esc: PropTypes.string.isRequired,
  primary: PropTypes.string.isRequired,
};

export default AnnouncementsDualButton;
