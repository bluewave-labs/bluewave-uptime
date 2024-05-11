import "./announcementsDualButtonWithIcon.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

function AnnouncementsDualButtonWithIcon({
  icon,
  subject,
  body,
  esc,
  primary,
}) {
  return (
    <div className="announcement-tile">
      {icon && <div className="announcement-icon">{icon}</div>}
      <div className="announcement-content">
        {subject && (
          <div className="announcement-content-subject">{subject}</div>
        )}
        {body && <div className="announcement-content-body">{body}</div>}
        {(esc || primary) && (
          <div className="announcement-content-controllers">
            {esc && <div className="controllers-button-esc">{esc}</div>}
            {primary && (
              <div className="controllers-button-primary">{primary}</div>
            )}
          </div>
        )}
      </div>
      <div className="announcement-close">
        <CloseIcon style={{ fill: "#98A2B3" }} />
      </div>
    </div>
  );
}

AnnouncementsDualButtonWithIcon.propTypes = {
  icon: PropTypes.object,
  subject: PropTypes.string,
  body: PropTypes.string,
  esc: PropTypes.string,
  primary: PropTypes.string,
};

export default AnnouncementsDualButtonWithIcon;
