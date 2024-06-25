import React from "react";
import EmailTextField from "../../Components/TextFields/Email/EmailTextField";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WebsiteTextField from "../../Components/TextFields/Website/WebsiteTextField";
import DescriptionTextField from "../../Components/TextFields/Description/DescriptionTextField";
import AnnouncementsDualButton from "../../Components/Announcements/AnnouncementsDualButton/AnnouncementsDualButton";
import AnnouncementsDualButtonWithIcon from "../../Components/Announcements/AnnouncementsDualButtonWithIcon/AnnouncementsDualButtonWithIcon";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ComplexAlert from "../../Components/Icons/ComplexAlert/ComplexAlert";
import AnnouncementsMessageBar from "../../Components/Announcements/AnnouncementsMessageBar/AnnouncementsMessageBar";
import AnnouncementUpdateSubscription from "../../Components/Announcements/AnnouncementUpdateSubscription/AnnouncementUpdateSubscription";
import PlayGroundCharts from "./PlayGround-Charts";
import PlayGroundPopupModals from "./PlayGround-Popup-Modals";
import PlayGroundTooltips from "./PlayGround-Tooltips";
import Toast from "../../Components/Toast";

// This Component is just for the development and test
// purposes and just to see what my components look like while development
// and will be removed in the end
function PlayGround() {
  return (
    <div>
      {/* Default state of Email Text Fields */}
      <EmailTextField
        error={false}
        placeholder="olivia@untitledui.com"
        id="outlined-basic"
        helperText="This is a hint text to help user."
      />
      {/* Email Text Field when validation error occures */}
      <EmailTextField
        error={true}
        placeholder="olivia@untitledui.com"
        id="outlined-basic"
        icon={<ErrorOutlineIcon style={{ fill: "red" }} />}
        helperText="This is an error message"
      />
      {/* Email Text Field while mouse hover */}
      <EmailTextField
        error={false}
        placeholder="olivia@untitledui.com"
        id="outlined-basic"
        icon={<HelpOutlineIcon />}
        helperText="This is a hint text to help user."
      />

      <hr />
      {/* Now, illustration of the Website text fields */}

      <WebsiteTextField hintText="This is a hint text to help user." />
      <WebsiteTextField
        hasCopyButton={true}
        hintText="This is a hint text to help user."
      />
      <Toast />

      <hr />
      {/* Now, illustration of the Description text fields */}

      <DescriptionTextField
        hasError={false}
        hintText="This is a hint text to help user."
      />
      <DescriptionTextField
        hasError={true}
        hintText="This is a hint text to help user."
      />
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

      <AnnouncementsDualButtonWithIcon
        icon={<ComplexAlert theme="red" />}
        subject="There was a problem with that action"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        pariatur, ipsum dolor."
        esc="Dismiss"
        primary="Learn more"
      />

      <AnnouncementsDualButtonWithIcon
        icon={<ComplexAlert theme="green" />}
        subject="Successfully updated profile"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        pariatur, ipsum dolor."
        esc="Dismiss"
        primary="Learn more"
      />

      <AnnouncementsDualButton
        subject="We’ve just released a new feature"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          pariatur, ipsum dolor."
        esc="Dismiss"
        primary="View changes"
      />

      <AnnouncementsMessageBar message="New employee created successfully" />

      <AnnouncementUpdateSubscription
        title="We’ve just released a new update!"
        text="Check out the all new dashboard view. Pages and now load faster."
        cancel="Dismiss"
        positive="Changelog"
        header="Subscribe to updates"
        button="Subscribe"
      />
      <hr />
      <PlayGroundCharts />
      <hr />
      <PlayGroundPopupModals />
      <hr />
      <PlayGroundTooltips />
    </div>
  );
}

export default PlayGround;
