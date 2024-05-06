import React from "react";
import DropdownTeamMember from "../../Components/DropdownTeamMember";
import "./index.css";
import Button from "../../Components/Button";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <DropdownTeamMember />
      <div style={{ display: "flex", flexDirection: "flex-column" }}>
        <div>
          <Button level="primary" label="Primary" />
          <Button level="secondary" label="Secondary" />
          <Button level="tertiary" label="Tertiary" />
          <Button level="error" label="Error" />
        </div>
      </div>
    </>
  );
};

export default Home;
