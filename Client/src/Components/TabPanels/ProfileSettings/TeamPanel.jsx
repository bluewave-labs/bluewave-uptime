import { useTheme } from "@emotion/react";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  MenuItem,
  Modal,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ButtonSpinner from "../../ButtonSpinner";
import Button from "../../Button";
import { useState } from "react";

/**
 * TeamPanel component manages the organization and team members,
 * providing functionalities like renaming the organization, managing team members,
 * and inviting new members.
 *
 * @returns {JSX.Element}
 */

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
//for testing, will be removed later
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

const TeamPanel = () => {
  const theme = useTheme();
  //TODO - use redux loading state
  //!! - currently all loading buttons are tied to the same state
  const [isLoading, setIsLoading] = useState(false);
  const [orgStates, setOrgStates] = useState({
    name: "Bluewave Labs",
    isLoading: false,
    isOpen: false,
    newName: "",
  });
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
  const handleCheckCell = (id) => {
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
  //TODO - implement select action function
  const handleSelectActionType = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  //TODO - implement select role function
  const handleSelectRoleType = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  //TODO - implement save team function
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
    <TabPanel
      value="2"
      sx={{ padding: "0", marginTop: theme.spacing(6.25) }}
    >
      <form className="edit-organization-form">
        <div className="edit-organization-form__wrapper">
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
        <Divider aria-hidden="true" sx={{ marginY: theme.spacing(6.25) }} />
      </form>
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
      <form className="edit-team-form" noValidate spellCheck="false">
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
            <Box onClick={() => handleFilter("")} sx={{ cursor: "pointer" }}>
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
                  onClick={handleSelectActionType}
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
                  onClick={handleSelectRoleType}
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
                          onChange={() => handleCheckCell(cell.id)}
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
    </TabPanel>
  );
};

TeamPanel.propTypes = {
  // No props are being passed to this component, hence no specific PropTypes are defined.
};

export default TeamPanel;
