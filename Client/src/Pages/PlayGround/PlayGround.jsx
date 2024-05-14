import React from "react";
import EmailTextField from "../../Components/TextFields/Email/EmailTextField";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WebsiteTextField from "../../Components/TextFields/Website/WebsiteTextField";
import DescriptionTextField from "../../Components/TextFields/Description/DescriptionTextField";

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
      <br />
      <hr />
      {/* Now, illustration of the Website text fields */}
      <br />
      <WebsiteTextField hintText="This is a hint text to help user." />
      <WebsiteTextField
        hasCopyButton={true}
        hintText="This is a hint text to help user."
      />
      <br />
      <br />
      <hr />
      {/* Now, illustration of the Description text fields */}
      <br />
      <DescriptionTextField
        hasError={false}
        hintText="This is a hint text to help user."
      />
      <DescriptionTextField
        hasError={true}
        hintText="This is a hint text to help user."
      />
    </div>
  );
}

export default PlayGround;
