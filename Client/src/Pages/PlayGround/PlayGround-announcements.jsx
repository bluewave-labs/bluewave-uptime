import "./playGround.css";
import React from "react";
import AnnouncementsDualButtonWithIcon from "../../components/Announcements/AnnouncementsDualButtonWithIcon/AnnouncementsDualButtonWithIcon";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ComplexAlert from "../../components/Icons/ComplexAlert/ComplexAlert";
import AnnouncementsMessageBar from "../../components/Announcements/AnnouncementsMessageBar/AnnouncementsMessageBar";
import AnnouncementsDualButton from "../../components/Announcements/AnnouncementsDualButton/AnnouncementsDualButton";
import AnnouncementUpdateSubscription from "../../components/Announcements/AnnouncementUpdateSubscription/AnnouncementUpdateSubscription";

function PlayGroundAnnouncements() {
  return (
    <div className="playground">
      <AnnouncementsDualButtonWithIcon
        icon={
          <div className="info-icon-frame">
            <InfoOutlinedIcon style={{ fill: "#344054" }} />
          </div>
        }
        subject="We’ve just released a new feature"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        pariatur, ipsum dolor."
        esc="Dismiss"
        primary="View changes"
      />
      <br />
      <br />
      <AnnouncementsDualButtonWithIcon
        icon={<ComplexAlert theme="red" />}
        subject="There was a problem with that action"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        pariatur, ipsum dolor."
        esc="Dismiss"
        primary="Learn more"
      />
      <br />
      <br />
      <AnnouncementsDualButtonWithIcon
        icon={<ComplexAlert theme="green" />}
        subject="Successfully updated profile"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        pariatur, ipsum dolor."
        esc="Dismiss"
        primary="Learn more"
      />
      <br />
      <br />
      <AnnouncementsDualButton
        subject="We’ve just released a new feature"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          pariatur, ipsum dolor."
        esc="Dismiss"
        primary="View changes"
      />
      <br />
      <br />
      <AnnouncementsMessageBar message="New employee created successfully" />
      <br />
      <br />
      <AnnouncementUpdateSubscription
        title="We’ve just released a new update!"
        text="Check out the all new dashboard view. Pages and now load faster."
        cancel="Dismiss"
        positive="Changelog"
        header="Subscribe to updates"
        button="Subscribe"
      />
      <br />
      <br />
    </div>
  );
}

export default PlayGroundAnnouncements;
