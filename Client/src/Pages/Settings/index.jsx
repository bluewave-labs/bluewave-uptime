import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  useTheme,
  TextField,
  Stack,
  Divider,
  Modal,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ButtonSpinner from "../../Components/ButtonSpinner";
import Button from "../../Components/Button";
import "./index.css";
import AnnouncementsDualButtonWithIcon from "../../Components/Announcements/AnnouncementsDualButtonWithIcon/AnnouncementsDualButtonWithIcon";
import ProfilePanel from "../../Components/TabPanels/ProfileSettings/ProfilePanel";

const tabList = ["Profile", "Password", "Team"];
const passwordConfig = {
  current_password: {
    id: "edit-current-password",
    label: "Current password",
    type: "input",
  },
  password: {
    id: "edit-password",
    label: "Password",
    type: "input",
  },
  confirm_password: {
    id: "notice-confirm-password",
    label: "Confirm new password",
    type: "notice",
  },
};
const orgConfig = {
  name: "Bluewave Labs",
  isLoading: false,
  isOpen: false,
  newName: "",
};
const teamColumns = [
  {
    id: "checkbox",
    label: "",
    sx: { minWidth: "20px", width: "40px" },
  },
  {
    id: "name",
    label: "NAME",
    sx: { fontSize: "12px" },
  },
  { id: "email", label: "EMAIL", sx: { fontSize: "12px" } },
  { id: "role", label: "ROLE", sx: { fontSize: "12px" } },
];
const teamConfig = [
  {
    id: 0,
    isChecked: false,
    name: "John Connor",
    email: "john@domain.com",
    type: "admin",
    role: "Administrator",
    createdAt: "10/4/2022",
  },
  {
    id: 1,
    isChecked: false,
    name: "Adam McFadden",
    email: "adam@domain.com",
    type: "member",
    role: "Member",
    createdAt: "10/4/2022",
  },
  {
    id: 2,
    isChecked: false,
    name: "Cris Cross",
    email: "cris@domain.com",
    type: "member",
    role: "Member",
    createdAt: "10/4/2022",
  },
  {
    id: 3,
    isChecked: false,
    name: "Prince",
    email: "prince@domain.com",
    type: "member",
    role: "Member",
    createdAt: "10/4/2022",
  },
];
const actionsConfig = [
  {
    value: "bulk",
    label: "Bulk actions",
  },
];
const roleConfig = [
  {
    value: "role",
    label: "Change role to",
  },
];

const Settings = () => {
  //(tab) 0 - Profile
  //(tab) 1 - Password
  //(tab) 2 - Team
  const [tab, setTab] = useState("0");
  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleSaveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
    }, 2000);
  };
  const handleDeleteAccount = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
    }, 2000);
  };
  const [showPassword, setShowPassword] = useState(false);

  const [orgStates, setOrgStates] = useState(orgConfig);
  const toggleOrgModal = (state) => {
    setOrgStates((prev) => ({
      ...prev,
      isOpen: state,
    }));
  };
  const toggleOrgLoading = (state) => {
    setOrgStates((prev) => ({
      ...prev,
      isLoading: state,
    }));
  };
  const handleRenameOrg = () => {
    toggleOrgLoading(true);

    setTimeout(() => {
      setOrgStates((prev) => ({
        ...prev,
        name: prev.newName !== "" ? prev.newName : prev.name,
        isLoading: false,
        isOpen: false,
        newName: "",
      }));
    }, 2000);
  };

  const [teamStates, setTeamStates] = useState({
    members: teamConfig,
    filter: "",
  });
  const handleCellChecked = (id) => {
    const updatedTeamStates = [...teamStates.members];
    updatedTeamStates[id] = {
      ...updatedTeamStates[id],
      isChecked: !updatedTeamStates[id].isChecked,
    };
    setTeamStates((prev) => ({
      ...prev,
      members: updatedTeamStates,
    }));
  };
  const handleFilter = (filter) => {
    setTeamStates((prev) => ({
      ...prev,
      filter: filter,
    }));
  };
  const handleApplyActionSelect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const handleApplyRoleSelect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const handleSaveTeam = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const [toggleInviteModal, setToggleInviteModal] = useState(false);
  const handleInviteMember = () => {};
  const handleMembersQuery = (type) => {
    let count = 0;
    teamStates.members.forEach((member) => {
      type === "" ? count++ : member.type === type ? count++ : "";
    });
    return count;
  };
  return (
    <Box
      //TODO - need to figure out document sizing
      //TODO - breakpoints for responsive design
      height="calc(100vh - 104px)"
      minWidth={theme.spacing(55)}
      width="100vw"
      maxWidth="calc(100vw - 800px)"
      mt={theme.spacing(8)}
      pt={theme.spacing(5)}
      px={theme.spacing(10)}
    >
      <TabContext value={tab}>
        <Box width="100%" sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="settings tabs">
            {tabList.map((label, index) => (
              <Tab
                label={label}
                key={index}
                value={index.toString()}
                sx={{
                  fontSize: "13px",
                  color: theme.palette.secondary.main,
                  textTransform: "none",
                  minWidth: "fit-content",
                  paddingLeft: "0",
                  paddingY: "8px",
                  marginRight: "20px",
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
            ))}
          </TabList>
        </Box>
        <ProfilePanel />
        <TabPanel
          value="1"
          sx={{ padding: "0", marginTop: theme.spacing(6.25), width: "100%" }}
        >
          <form className="edit-password-form" noValidate spellCheck="false">
            <div className="edit-password-form__wrapper">
              <AnnouncementsDualButtonWithIcon
                icon={<InfoOutlinedIcon style={{ fill: "#344054" }} />}
                subject="SSO login"
                body="Since you logged in via SSO, you cannot reset or modify your password."
              />
            </div>
            {Object.entries(passwordConfig).map(([key, field]) => (
              <div className="edit-password-form__wrapper" key={key}>
                <Stack
                  direction="column"
                  gap="8px"
                  sx={{ flex: 1, marginRight: "10px" }}
                >
                  <Typography variant="h4" component="h1">
                    {field.label}
                  </Typography>
                </Stack>
                {/* TODO - Refactor Password Input Component */}
                {field.type === "input" ? (
                  <FormControl sx={{ flex: 1, minWidth: theme.spacing(30) }}>
                    <OutlinedInput
                      id={field.id}
                      value="RandomPasswordLol"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            sx={{
                              width: "30px",
                              height: "30px",
                              "&:focus": {
                                outline: "none",
                              },
                            }}
                          >
                            {!showPassword ? (
                              <VisibilityOff sx={{ fill: "#98A2B3" }} />
                            ) : (
                              <Visibility sx={{ fill: "#98A2B3" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    ></OutlinedInput>
                  </FormControl>
                ) : field.type === "notice" ? (
                  <Box sx={{ flex: 1, minWidth: theme.spacing(30) }}>
                    <AnnouncementsDualButtonWithIcon
                      icon={
                        <WarningAmberOutlinedIcon style={{ fill: "#f79009" }} />
                      }
                      body="New password must contain at least 8 characters and must have at least one uppercase letter, one number and one symbol."
                    />
                  </Box>
                ) : (
                  ""
                )}
              </div>
            ))}
            <Divider
              aria-hidden="true"
              width="0"
              sx={{ marginY: theme.spacing(6.25) }}
            />
            {/* !!! - All save buttons are tied to the same state */}
            {/* TODO - Implement Save Password function */}
            <Stack direction="row" justifyContent="flex-end">
              <Box width="fit-content">
                <ButtonSpinner
                  level="primary"
                  label="Save"
                  onClick={handleSaveProfile}
                  isLoading={isLoading}
                  loadingText="Saving..."
                  sx={{
                    paddingX: "40px",
                    height: "fit-content",
                    fontSize: "13px",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                />
              </Box>
            </Stack>
          </form>
        </TabPanel>
        <TabPanel
          value="2"
          sx={{ padding: "0", marginTop: theme.spacing(6.25), width: "100%" }}
        >
          <form className="edit-team-form" noValidate spellCheck="false">
            <div className="edit-team-form__wrapper">
              <Stack
                direction="column"
                gap="8px"
                sx={{ flex: 1, marginRight: "10px" }}
              >
                <Typography variant="h4" component="h1">
                  Organization name
                </Typography>
              </Stack>
              <Stack
                id="org-name-flex-container"
                direction="row"
                justifyContent="flex-end"
                gap="8px"
                sx={{ flex: 1 }}
              >
                <ButtonSpinner
                  level="tertiary"
                  label={!orgStates.isLoading ? orgStates.name : ""}
                  disabled
                  onClick={() => toggleOrgModal(true)}
                  isLoading={orgStates.isLoading}
                  sx={{ fontSize: "13px" }}
                />
                <Button
                  level="primary"
                  label="Rename"
                  sx={{ paddingX: "30px", fontSize: "13px" }}
                  onClick={() => toggleOrgModal(true)}
                />
              </Stack>
            </div>
            <div className="edit-team-form__wrapper">
              <Typography variant="h4" component="h1">
                Team members
              </Typography>
            </div>
            <div
              className="edit-team-form__wrapper compact"
              style={{ alignItems: "center" }}
            >
              <Stack
                direction="row"
                gap="20px"
                alignItems="center"
                sx={{ flex: 1, fontSize: "14px" }}
              >
                <Box
                  onClick={() => handleFilter("")}
                  sx={{ cursor: "pointer" }}
                >
                  All
                  <span className="members-query">
                    <span>{handleMembersQuery("")}</span>
                  </span>
                </Box>
                <Box
                  onClick={() => handleFilter("admin")}
                  sx={{ cursor: "pointer" }}
                >
                  Administrator
                  <span className="members-query">
                    <span>{handleMembersQuery("admin")}</span>
                  </span>
                </Box>
                <Box
                  onClick={() => handleFilter("member")}
                  sx={{ cursor: "pointer" }}
                >
                  Member
                  <span className="members-query">
                    <span>{handleMembersQuery("member")}</span>
                  </span>
                </Box>
              </Stack>
              <Button
                level="primary"
                label="Invite a team member"
                sx={{ paddingX: "30px", fontSize: "13px" }}
                onClick={() => setToggleInviteModal(true)}
              />
            </div>
            <div className="edit-team-form__wrapper compact">
              <Container
                disableGutters
                sx={{
                  border: `1px solid ${theme.palette.section.borderColor}`,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  borderBottom: "none",
                }}
              >
                <Stack direction="row" gap="40px" p="20px">
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Select
                      id="select-actions"
                      value="bulk"
                      sx={{
                        fontSize: "13px",
                        color: theme.palette.secondary.main,
                      }}
                      inputProps={{ id: "select-actions-input" }}
                    >
                      {actionsConfig.map((action) => (
                        <MenuItem
                          value={action.value}
                          key={action.value}
                          sx={{ fontSize: "13px" }}
                        >
                          {action.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <ButtonSpinner
                      level="secondary"
                      label="Apply"
                      onClick={handleApplyActionSelect}
                      isLoading={isLoading}
                      sx={{
                        height: "fit-content",
                        fontSize: "13px",
                        fontWeight: 500,
                        bgcolor: "#fafafa",
                      }}
                    />
                  </Stack>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Select
                      id="select-role"
                      value="role"
                      sx={{
                        fontSize: "13px",
                        color: theme.palette.secondary.main,
                      }}
                      inputProps={{ id: "select-role-input" }}
                    >
                      {roleConfig.map((role) => (
                        <MenuItem
                          value={role.value}
                          key={role.value}
                          sx={{ fontSize: "13px" }}
                        >
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <ButtonSpinner
                      level="secondary"
                      label="Apply"
                      onClick={handleApplyRoleSelect}
                      isLoading={isLoading}
                      sx={{
                        height: "fit-content",
                        fontSize: "13px",
                        fontWeight: 500,
                        bgcolor: "#fafafa",
                      }}
                    />
                  </Stack>
                </Stack>
                <Table
                  sx={{
                    borderTop: `1px solid ${theme.palette.section.borderColor}`,
                    tableLayout: "fixed",
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        bgcolor: "#fafafa",
                      }}
                    >
                      {teamColumns.map((cell) => (
                        <TableCell
                          key={cell.id}
                          sx={{
                            ...cell.sx,
                            color: theme.palette.otherColors.slateGray,
                          }}
                        >
                          {cell.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teamStates.members.map((cell) =>
                      teamStates.filter === "" ||
                      teamStates.filter === cell.type ? (
                        <TableRow key={cell.id}>
                          <TableCell align="center">
                            <Checkbox
                              id={`${cell.id}-${cell.name}`}
                              checked={cell.isChecked}
                              onChange={() => handleCellChecked(cell.id)}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </TableCell>
                          <TableCell>
                            <Stack direction="column">
                              <Box
                                sx={{
                                  color: theme.palette.otherColors.blackish,
                                  verticalAlign: "top",
                                }}
                              >
                                {cell.name}
                              </Box>
                              <Box>Created at {cell.createdAt}</Box>
                            </Stack>
                          </TableCell>
                          <TableCell>{cell.email}</TableCell>
                          <TableCell>{cell.role}</TableCell>
                        </TableRow>
                      ) : (
                        ""
                      )
                    )}
                  </TableBody>
                </Table>
              </Container>
            </div>
            <Divider
              aria-hidden="true"
              width="0"
              sx={{ marginY: theme.spacing(6.25) }}
            />
            {/* !!! - All save buttons are tied to the same state */}
            {/* TODO - Implement Save Team function */}
            <Stack direction="row" justifyContent="flex-end">
              <Box width="fit-content">
                <ButtonSpinner
                  level="primary"
                  label="Save"
                  onClick={handleSaveTeam}
                  isLoading={isLoading}
                  loadingText="Saving..."
                  sx={{
                    paddingX: "40px",
                    height: "fit-content",
                    fontSize: "13px",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                />
              </Box>
            </Stack>
          </form>
        </TabPanel>
      </TabContext>
      <Modal
        aria-labelledby="modal-edit-org-name"
        aria-describedby="edit-organization-name"
        open={orgStates.isOpen}
        onClose={() => toggleOrgModal(false)}
        disablePortal
      >
        <Stack
          gap="20px"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "solid 1px #f2f2f2",
            borderRadius: "4px",
            boxShadow: 24,
            p: "30px",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography id="modal-edit-org-name" variant="h4" component="h1">
            Rename this organization?
          </Typography>
          <TextField
            id="edit-organization-name"
            placeholder={orgStates.name}
            spellCheck="false"
            value={orgStates.newName}
            onChange={(event) =>
              setOrgStates((prev) => ({
                ...prev,
                newName: event.target.value,
              }))
            }
          ></TextField>
          <Stack direction="row" gap="10px" mt="10px" justifyContent="flex-end">
            <Button
              level="tertiary"
              label="Cancel"
              onClick={() => toggleOrgModal(false)}
              sx={{ fontSize: "13px" }}
            />
            <ButtonSpinner
              level="primary"
              label="Rename"
              onClick={handleRenameOrg}
              isLoading={orgStates.isLoading}
              sx={{ fontSize: "13px", paddingX: "30px" }}
            />
          </Stack>
        </Stack>
      </Modal>
      <Modal
        aria-labelledby="modal-invite-member"
        aria-describedby="invite-member-to-team"
        open={toggleInviteModal}
        onClose={() => setToggleInviteModal(false)}
        disablePortal
      >
        <Stack
          gap="10px"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "solid 1px #f2f2f2",
            borderRadius: "4px",
            boxShadow: 24,
            p: "30px",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography id="modal-invite-member" variant="h4" component="h1">
            Invite new team member
          </Typography>
          <Typography
            id="invite-member-to-team"
            variant="h5"
            component="p"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "13px",
            }}
          >
            When you add a new team member, they will get access to all
            monitors.
          </Typography>
          <TextField
            id="input-team-member"
            spellCheck="false"
            // value={orgStates.newName}
            // onChange={(event) =>
            //   setOrgStates((prev) => ({
            //     ...prev,
            //     newName: event.target.value,
            //   }))
            // }
          ></TextField>
          <Stack direction="row" gap="10px" mt="10px" justifyContent="flex-end">
            <Button
              level="tertiary"
              label="Cancel"
              onClick={() => setToggleInviteModal(false)}
              sx={{ fontSize: "13px" }}
            />
            <ButtonSpinner
              level="primary"
              label="Send invite"
              onClick={handleInviteMember}
              isLoading={isLoading}
              sx={{ fontSize: "13px" }}
            />
          </Stack>
        </Stack>
      </Modal>
    </Box>
  );
};

export default Settings;
