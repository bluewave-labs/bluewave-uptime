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
import EditSvg from "../../../assets/icons/edit.svg?react";

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
  //TODO - connect to redux
  const [orgStates, setOrgStates] = useState({
    name: "Bluewave Labs",
    isLoading: false,
    isEdit: false,
    newName: "",
  });

  const toggleEdit = () => {
    setOrgStates((prev) => ({ ...prev, isEdit: !prev.isEdit }));
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setOrgStates((prev) => ({
      ...prev,
      name: value,
    }));
  };
  const handleRename = () => {};

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
  const [isOpen, setIsOpen] = useState(false);
  const handleInviteMember = () => {};
  const handleMembersQuery = (type) => {
    let count = 0;
    teamStates.members.forEach((member) => {
      type === "" ? count++ : member.type === type ? count++ : "";
    });
    return count;
  };
  return (
    <TabPanel value="team">
      <form className="edit-organization-form">
        <div className="edit-organization-form__wrapper">
          <Stack>
            <Typography component="h1">Organization name</Typography>
          </Stack>
          <Stack
            className="row-stack"
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ minHeight: "34px", maxHeight: "34px" }}
          >
            <TextField
              value={orgStates.name}
              onChange={handleChange}
              disabled={!orgStates.isEdit}
              sx={{
                color: theme.palette.otherColors.bluishGray,
                "& .Mui-disabled": {
                  WebkitTextFillColor: "initial !important",
                },
                "& .Mui-disabled fieldset": {
                  borderColor: "transparent !important",
                },
              }}
              inputProps={{
                sx: { textAlign: "end", padding: theme.gap.small },
              }}
            />
            <Button
              level={orgStates.isEdit ? "secondary" : "tertiary"}
              label={orgStates.isEdit ? "Save" : ""}
              img={!orgStates.isEdit ? <EditSvg /> : ""}
              onClick={() => toggleEdit()}
              sx={{
                minWidth: 0,
                paddingX: theme.gap.small,
                ml: orgStates.isEdit ? theme.gap.small : 0,
              }}
            />
          </Stack>
        </div>
        <Divider
          aria-hidden="true"
          className="short-divider"
          sx={{ marginY: theme.spacing(4) }}
        />
      </form>
      <form className="edit-team-form" noValidate spellCheck="false">
        <div className="edit-team-form__wrapper">
          <Typography component="h1">Team members</Typography>
        </div>
        <div className="edit-team-form__wrapper compact">
          <Stack
            direction="row"
            gap="20px"
            alignItems="center"
            sx={{ fontSize: "14px" }}
          >
            <Box onClick={() => handleFilter("")}>
              All
              <span className="members-query">
                <span>{handleMembersQuery("")}</span>
              </span>
            </Box>
            <Box onClick={() => handleFilter("admin")}>
              Administrator
              <span className="members-query">
                <span>{handleMembersQuery("admin")}</span>
              </span>
            </Box>
            <Box onClick={() => handleFilter("member")}>
              Member
              <span className="members-query">
                <span>{handleMembersQuery("member")}</span>
              </span>
            </Box>
          </Stack>
          <Button
            level="primary"
            label="Invite a team member"
            sx={{ paddingX: "30px" }}
            onClick={() => setIsOpen(true)}
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
              <Stack
                direction="row"
                gap="10px"
                alignItems="center"
                className="table-stack"
              >
                <Select
                  id="select-actions"
                  value="bulk"
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
                    bgcolor: "#fafafa",
                  }}
                />
              </Stack>
              <Stack direction="row" gap="10px" alignItems="center">
                <Select
                  id="select-role"
                  value="role"
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
        <Divider aria-hidden="true" width="0" />
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
              }}
            />
          </Box>
        </Stack>
      </form>
      <Modal
        aria-labelledby="modal-invite-member"
        aria-describedby="invite-member-to-team"
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
            borderRadius: `${theme.shape.borderRadius}px`,
            boxShadow: 24,
            p: "30px",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography id="modal-invite-member" component="h1">
            Invite new team member
          </Typography>
          <Typography id="invite-member-to-team" component="p">
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
              onClick={() => setIsOpen(false)}
            />
            <ButtonSpinner
              level="primary"
              label="Send invite"
              onClick={handleInviteMember}
              isLoading={isLoading}
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
