import React from "react";
import DropdownTeamMember from "../../Components/DropdownTeamMember";
import "./index.css";
import Button from "../../Components/Button";
import SettingsIcon from "@mui/icons-material/Settings";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <DropdownTeamMember />
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}
      >
        <h4>Buttons</h4>
        <div>
          <Button
            level="primary"
            label="Primary"
            onClick={() => {
              alert("Primary");
            }}
          />
          <Button
            level="secondary"
            label="Secondary"
            onClick={() => alert("Secondary")}
          />
          <Button
            level="tertiary"
            label="Tertiary"
            onClick={() => alert("Tertiary")}
          />
          <Button level="error" label="Error" onClick={() => alert("Error")} />
        </div>
        <h4>Disabled Buttons</h4>
        <div>
          <Button level="primary" label="Primary" disabled />
          <Button level="secondary" label="Secondary" disabled />
          <Button level="tertiary" label="Tertiary" disabled />
          <Button level="error" label="Error" disabled />
        </div>
        <h4>Image Button</h4>
        <div>
          <Button
            level="tertiary"
            label="Configure"
            startIcon={<SettingsIcon />}
          />
          <Button
            level="tertiary"
            label="Configure"
            endIcon={<SettingsIcon />}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
