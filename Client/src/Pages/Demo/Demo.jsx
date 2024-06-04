import React from "react";
import axios from "axios";
import Button from "../../Components/Button/";
import Link from "../../Components/Link";
import {
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
  Typography,
} from "@mui/material";
import { ColoredLabel, StatusLabel } from "../../Components/Label/";
import Avatar from "../../Components/Avatar/";
import ProgressStepper from "../../Components/ProgressStepper";
import avatarImage from "../../assets/Images/avatar_placeholder.png";
import Section from "../../Components/Section";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";

// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMonitors } from "../../Features/Monitors/monitorsSlice";

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

const demoMonitors = [
  { id: 0, name: "Google", isActive: true },
  { id: 1, name: "Yahoo", isActive: false },
  { id: 2, name: "Reddit", isActive: true },
];

const Demo = () => {
  const dispatch = useDispatch();

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

  const links = [
    {
      name: "Buttons",
      url: "#buttons",
    },
    {
      name: "Disabled Buttons",
      url: "#disabled-buttons",
    },
    {
      name: "Labels",
      url: "#labels",
    },
    {
      name: "Status Labels",
      url: "#status-labels",
    },
    {
      name: "Avatar",
      url: "#avatar",
    },
    {
      name: "Switches",
      url: "#switches",
    },
    {
      name: "Checkboxes",
      url: "#checkboxes",
    },
    {
      name: "Radio",
      url: "#radio",
    },
    {
      name: "Table",
      url: "#table",
    },
    {
      name: "Tabs",
      url: "#tabs",
    },
    {
      name: "Date Picker",
      url: "#date-picker",
    },
    {
      name: "Stepper",
      url: "#stepper",
    },
    {
      name: "Section",
      url: "#section",
    },
  ];

  const theme = useTheme();

  // *********************************
  // Redux Demo
  // *********************************
  const monitorState = useSelector((state) => state.monitors);
  const { monitors } = monitorState;
  return (
    <div>
      <div style={{ padding: "4rem", border: "1px solid black" }}>
        <Typography variant="h4">Redux Demo</Typography>
        <Typography variant="h6">Monitors</Typography>
        <table
          style={{ border: "1px solid black", borderCollapse: "collapse" }}
        >
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Name</th>
              <th style={{ border: "1px solid black" }}>URL</th>
            </tr>
            {monitors &&
              monitors.map((monitor) => {
                return (
                  <tr key={monitor._id}>
                    <td style={{ border: "1px solid black" }}>
                      {monitor.name}
                    </td>
                    <td style={{ border: "1px solid black" }}>{monitor.url}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Button
          level="primary"
          label="Get Monitors"
          onClick={() => {
            dispatch(getMonitors());
          }}
        />
      </div>
      <ul style={{ listStyle: "none" }}>
        {links.map((link) => (
          <li key={link.url}>
            <Link level="primary" label={link.name} url={link.url} />
          </li>
        ))}
      </ul>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="buttons">Buttons</h4>
      <div>
        <Button level="primary" label="Primary" />
        <Button level="secondary" label="Secondary" />
        <Button level="tertiary" label="Tertiary" />
        <Button level="error" label="Error" />
        <Button level="imageTertiary" label="Image Button" img={<AddIcon />} />
      </div>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="disabled-buttons">Disabled Buttons</h4>
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
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="labels">Labels</h4>
      <div>
        <ColoredLabel label="Label" color={theme.palette.labelGray.color} />
        <ColoredLabel label="Label" color={theme.palette.labelPurple.color} />
        <ColoredLabel label="Label" color={theme.palette.labelGreen.color} />
        <ColoredLabel label="Label" color={theme.palette.labelOrange.color} />
      </div>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="status-labels">Status Lables</h4>
      <div>
        <StatusLabel status="Seen" />
        <StatusLabel status="Waiting" />
        <StatusLabel status="New" />
        <StatusLabel status="Active" />
      </div>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="avatar">Avatar</h4>
      <div style={{ display: "flex" }}>
        <Avatar src={avatarImage} firstName="Alex" lastName="Holliday" />
        <Avatar firstName="Alex" lastName="Holliday" />
        <Avatar src={avatarImage} firstName="Alex" lastName="Holliday" small />
        <Avatar firstName="Alex" lastName="Holliday" small />
      </div>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="switches">Switches</h4>
      <div>
        <Switch onChange={(event) => change(event, "Switch")} />
        <Switch size="small" />
        <Switch disabled />
        <Switch checked />
      </div>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="checkboxes">Checkboxes</h4>
      <div>
        <Checkbox onChange={(event) => change(event, "Checkbox")} />
        <Checkbox size="small" />
        <Checkbox disabled />
        <Checkbox checked />
      </div>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="radio">Radio</h4>
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
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="table">Table</h4>
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
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="tabs">Tabs</h4>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <Tabs value={tab} onChange={handleTab}>
          <Tab label="My details" value="details" />
          <Tab label="My team" value="team" />
          <Tab label="Departments" value="departments" />
          <Tab label="Approvals" value="approvals" />
        </Tabs>
      </div>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="date-picker">Date Picker</h4>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={handleDate} />
        </LocalizationProvider>
        <h4>{date}</h4>
      </div>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="stepper">Stepper</h4>
      <div>
        <ProgressStepper steps={steps}></ProgressStepper>
      </div>
      <Divider sx={{ margin: `${theme.spacing(2)}` }} />
      <h4 id="section">Section</h4>
      <Section monitors={demoMonitors} />
    </div>
  );
};
export default Demo;
