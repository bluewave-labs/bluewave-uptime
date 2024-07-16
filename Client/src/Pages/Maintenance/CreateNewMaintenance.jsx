import React, { useState } from "react";
import Dropdown from "../../Components/Dropdown";

const CreateNewMaintenance = () => {
  const repeatComponents = {
    "Don't repeat": [<div key={1}>a</div>, <div key={2}>b</div>],
    "Repeat daily": [<div key={3}>c</div>, <div key={4}>d</div>],
    "Repeat weekly": [<div key={4}>e</div>, <div key={6}>f</div>],
  };

  const repeatDropDown = [
    { name: "Don't repeat" },
    { name: "Repeat daily" },
    { name: "Repeat weekly" },
  ];

  const [maintenanceOptions, setMaintenanceOptions] = useState("Don't repeat");

  const [selectedOption, setSelectedOption] = useState(repeatDropDown[0]);

  const handleChange = (e, newValue) => {
    setMaintenanceOptions(newValue.name);
    setSelectedOption(newValue);
  };

  return (
    <div>
      <div>Create a maintenance window</div>
      <div>Your pings won&apos;t be sent in this time frame.</div>
      <div>Repeat</div>
      <div>
        <Dropdown
          id="repeat-dropdown"
          label="repeat"
          options={repeatDropDown}
          value={selectedOption}
          onChange={handleChange}
        />
      </div>
      {repeatComponents[maintenanceOptions]}
    </div>
  );
};

export default CreateNewMaintenance;
