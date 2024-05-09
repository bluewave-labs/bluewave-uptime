import React from "react";
import Button from "../../Components/Button";
import Link from "../../Components/Link";
import ColoredLabel from "../../Components/Label/ColoredLabel";
import {
  Box,
  useTheme,
  Switch,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
} from "@mui/material";
import StatusLabel from "../../Components/Label/StautsLabel";
import Avatar from "../../Components/Avatar/Avatar";
import ProgressStepper from "../../Components/ProgressStepper/ProgressStepper";
import avatarImage from "../../assets/Images/avatar_placeholder.png";
import { DataGrid } from "@mui/x-data-grid";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const cols = [
  {
    field: "name",
    headerName: "Name",
    renderCell: (params) => {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={params.value.avatarImage}
            firstName={params.value.firstName}
            lastName={params.value.lastName}
          />
          <div style={{ marginLeft: "1rem" }}>
            {params.value.firstName} {params.value.lastName}
          </div>
        </div>
      );
    },
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
      return <StatusLabel status={params.value} />;
    },
    flex: 1,
  },
  { field: "role", headerName: "Role", flex: 1 },
  { field: "team", headerName: "Team", flex: 1 },
  { field: "hireDate", headerName: "Hire date", flex: 1 },
];

const rows = ((count) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    let row = {
      id: i,
      name: {
        avatarImage: i % 2 === 0 ? avatarImage : null,
        firstName: "Placeholder Name",
        lastName: i.toString(),
      },
      status: "Active",
      role: "Product Designer",
      team: "Marketing",
      hireDate: new Date().toLocaleDateString(),
    };
    arr.push(row);
  }
  return arr;
})(100);

const steps = [
  { label: "Your details", content: "Please provide your name and email" },
  { label: "Company details", content: "A few details about your company" },
  { label: "Invite your team", content: "Start collaborating with your team" },
];

const Demo = () => {
  const [radio, setRadio] = React.useState(1);
  const [tab, setTab] = React.useState("departments");
  const [date, setDate] = React.useState("Pick a date!");

  const handleRadio = (event) => {
    setRadio(event.target.value);
  };

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleDate = (newValue) => {
    setDate(newValue.toString());
  };

  const change = (event, type) => {
    alert(event.target.checked ? `${type} checked` : `${type} unchecked`);
  };

  const theme = useTheme();
  return (
    <div>
      <h4>Buttons</h4>
      <div>
        <Button level="primary" label="Primary" />
        <Button level="secondary" label="Secondary" />
        <Button level="tertiary" label="Tertiary" />
        <Button level="error" label="Error" />
      </div>
      <h4>Disabled Buttons</h4>
      <div>
        <Button level="primary" label="Primary" disabled />
        <Button level="secondary" label="Secondary" disabled />
        <Button level="tertiary" label="Tertiary" disabled />
        <Button level="error" label="Error" disabled />
      </div>
      <div>
        <Link
          level="tertiary"
          label="Tertiary Link"
          url={"https://www.google.com"}
        />
      </div>
      <h4>Labels</h4>
      <div>
        <ColoredLabel label="Label" color={theme.palette.labelGray.color} />
        <ColoredLabel label="Label" color={theme.palette.labelPurple.color} />
        <ColoredLabel label="Label" color={theme.palette.labelGreen.color} />
        <ColoredLabel label="Label" color={theme.palette.labelOrange.color} />
      </div>

      <h4>Status Lables</h4>
      <div>
        <StatusLabel status="Seen" />
        <StatusLabel status="Waiting" />
        <StatusLabel status="New" />
        <StatusLabel status="Active" />
      </div>
      <h4>Avatar</h4>
      <div style={{ display: "flex" }}>
        <Avatar src={avatarImage} firstName="Alex" lastName="Holliday" />
        <Avatar firstName="Alex" lastName="Holliday" />
        <Avatar src={avatarImage} firstName="Alex" lastName="Holliday" small />
        <Avatar firstName="Alex" lastName="Holliday" small />
      </div>
      <h4>Switches</h4>
      <div>
        <Switch onChange={(event) => change(event, "Switch")} />
        <Switch size="small" />
        <Switch disabled />
        <Switch checked />
      </div>
      <h4>Checkboxes</h4>
      <div>
        <Checkbox onChange={(event) => change(event, "Checkbox")} />
        <Checkbox size="small" />
        <Checkbox disabled />
        <Checkbox checked />
      </div>
      <h4>Radio</h4>
      <div>
        <FormControl>
          <FormLabel>Demo Radio</FormLabel>
          <RadioGroup value={radio} onChange={handleRadio}>
            <div>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel
                value={3}
                control={<Radio size="small" />}
                label="3"
              />
              <FormControlLabel
                value={4}
                control={<Radio disabled />}
                label="4"
              />
            </div>
          </RadioGroup>
        </FormControl>
      </div>
      <h4>Table</h4>
      <div style={{ width: "75vw" }}>
        <DataGrid
          autoHeight
          columns={cols}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
      <h4>Tabs</h4>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <Tabs value={tab} onChange={handleTab}>
          <Tab label="My details" value="details" />
          <Tab label="My team" value="team" />
          <Tab label="Departments" value="departments" />
          <Tab label="Approvals" value="approvals" />
        </Tabs>
      </div>

      <h4>Date Picker</h4>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={handleDate} />
        </LocalizationProvider>
        <h4>{date}</h4>
      </div>

      <h4>Stepper</h4>
      <div>
        <ProgressStepper steps={steps}></ProgressStepper>
      </div>
    </div>
  );
};
export default Demo;
