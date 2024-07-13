import React from "react";
import PlayGroundCharts from "./PlayGround-Charts";
import PlayGroundPopupModals from "./PlayGround-Popup-Modals";
import PlayGroundTooltips from "./PlayGround-Tooltips";
import Field from "../../Components/Inputs/Field";

// This Component is just for the development and test
// purposes and just to see what my components look like while development
// and will be removed in the end
function PlayGround() {
  return (
    <div>
      {/* Default state of Email Text Fields */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          padding: "10px",
        }}
      >
        <Field
          type="email"
          id="outlined-basic"
          label="Email"
          placeholder="olivia@untitledui.com"
        />
        {/* Email Text Field when validation error occures */}
        <Field
          type="email"
          id="outlined-basic"
          label="Email"
          placeholder="olivia@untitledui.com"
          error="This is an error message"
        />
      </div>

      <hr />

      {/* Now, illustration of the Website text fields */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          padding: "10px",
        }}
      >
        <Field type="url" label="Website" />
        <Field type="url" label="Website" hasCopy={true} />
      </div>

      <hr />
      {/* Now, illustration of the Description text fields */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          padding: "10px",
        }}
      >
        <Field
          type="description"
          label="Description"
          placeholder="Enter a description... "
        />
        <Field
          type="description"
          label="Description"
          placeholder="Enter a description... "
          error="This is an error message"
        />
      </div>
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
