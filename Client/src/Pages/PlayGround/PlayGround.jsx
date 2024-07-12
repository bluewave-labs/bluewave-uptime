import React from "react";
import EmailTextField from "../../Components/TextFields/Email/EmailTextField";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WebsiteTextField from "../../Components/TextFields/Website/WebsiteTextField";
import DescriptionTextField from "../../Components/TextFields/Description/DescriptionTextField";
import PlayGroundCharts from "./PlayGround-Charts";
import PlayGroundPopupModals from "./PlayGround-Popup-Modals";
import PlayGroundTooltips from "./PlayGround-Tooltips";

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
