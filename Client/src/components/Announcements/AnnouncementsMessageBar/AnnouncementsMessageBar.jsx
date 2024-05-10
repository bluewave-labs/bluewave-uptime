import "./announcementsMessageBar.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function AnnouncementsMessageBar() {
  return (
    <div className="announcement-tile">
      <div className="announcement-messagebar-body">
        New employee created successfully
      </div>
      <div className="announcement-close">
        <CloseIcon style={{ fill: "#98A2B3" }} />
      </div>
    </div>
  );
}

export default AnnouncementsMessageBar;
