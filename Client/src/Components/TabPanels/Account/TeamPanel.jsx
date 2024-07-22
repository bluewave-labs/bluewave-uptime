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
  TextField,
  Typography,
} from "@mui/material";
import ButtonSpinner from "../../ButtonSpinner";
import Button from "../../Button";
import { useEffect, useState } from "react";
import EditSvg from "../../../assets/icons/edit.svg?react";
import Field from "../../Inputs/Field";
import { credentials } from "../../../Validation/validation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axiosInstance from "../../../Utils/axiosConfig";
import { createToast } from "../../../Utils/toastUtils";
import { useSelector } from "react-redux";
import BasicTable from "../../BasicTable";

/**
 * TeamPanel component manages the organization and team members,
 * providing functionalities like renaming the organization, managing team members,
 * and inviting new members.
 *
 * @returns {JSX.Element}
 */

const TeamPanel = () => {
  const theme = useTheme();

  const { authToken } = useSelector((state) => state.auth);
  //TODO
  const [orgStates, setOrgStates] = useState({
    name: "Bluewave Labs",
    isEdit: false,
  });
  const [toInvite, setToInvite] = useState({
    email: "",
    role: "",
  });
  const [teamStates, setTeamStates] = useState({});
  const [tableData, setTableData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axiosInstance.get("/auth/users", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setTeamStates({ members: response.data.data, filters: "" });

        const data = {
          cols: [
            { id: 1, name: "NAME" },
            { id: 2, name: "EMAIL" },
            { id: 3, name: "ROLE" },
          ],
          rows: response.data.data.map((member, idx) => {
            return {
              id: member._id,
              data: [
                { id: idx, data: member.firstName + " " + member.lastName },
                { id: idx + 1, data: member.email },
                {
                  id: idx + 2,
                  data: member.role[0] === "admin" ? "Administrator" : "Member",
                },
              ],
            };
          }),
        };

        setTableData(data);
      } catch (error) {
        createToast({
          body: error.message || "Error fetching team members.",
        });
      }
    };

    fetchTeam();
  }, []);

  // RENAME ORGANIZATION
  const toggleEdit = () => {
    setOrgStates((prev) => ({ ...prev, isEdit: !prev.isEdit }));
  };
  const handleRename = () => {};

  // TABLE ACTIONS
  const handleMembersQuery = (type) => {
    let count = 0;
    tableData.rows?.forEach((member) => {
      type === "" ? count++ : member.data[2].data === type ? count++ : "";
    });
    return count;
  };

  // const handleCheckCell = (id) => {
  //   const updatedTeamStates = [...teamStates.members];
  //   updatedTeamStates[id] = {
  //     ...updatedTeamStates[id],
  //     isChecked: !updatedTeamStates[id].isChecked,
  //   };
  //   setTeamStates((prev) => ({
  //     ...prev,
  //     members: updatedTeamStates,
  //   }));
  // };
  // const handleFilter = (filter) => {
  //   setTeamStates((prev) => ({
  //     ...prev,
  //     filter: filter,
  //   }));
  // };
  //TODO - implement save team function
  const handleSaveTeam = () => {};

  const handleChange = (event) => {
    const { value } = event.target;
    setToInvite((prev) => ({
      ...prev,
      email: value,
    }));

    const validation = credentials.validate(
      { email: value },
      { abortEarly: false }
    );

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      if (validation.error) {
        updatedErrors.email = validation.error.details[0].message;
      } else {
        delete updatedErrors.email;
      }
      return updatedErrors;
    });
  };

  // INVITE MEMBER
  const [isOpen, setIsOpen] = useState(false);
  const handleInviteMember = async () => {
    if (toInvite.role !== "user" || toInvite !== "admin")
      setToInvite((prev) => ({ ...prev, role: "user" }));

    const { error } = credentials.validate(
      { email: toInvite.email },
      {
        abortEarly: false,
      }
    );

    if (error) {
      setErrors((prev) => ({ ...prev, email: error.details[0].message }));
    } else
      try {
        await axiosInstance.post(
          "/auth/invite",
          {
            email: toInvite.email,
            role: toInvite.role,
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        closeInviteModal();
        createToast({
          body: "Member invited. They will receive an email with details on how to create their account.",
        });
      } catch (error) {
        createToast({
          body: error.message || "Unknown error.",
        });
      }
  };
  const closeInviteModal = () => {
    setIsOpen(false);
    setToInvite({ email: "", role: "" });
    setErrors({});
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
              onChange={(event) =>
                setOrgStates((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
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
                <span>{handleMembersQuery("Administrator")}</span>
              </span>
            </Box>
            <Box onClick={() => handleFilter("member")}>
              Member
              <span className="members-query">
                <span>{handleMembersQuery("Member")}</span>
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
        <BasicTable data={tableData} paginated={false} reversed={true} />
        <Divider aria-hidden="true" width="0" />
        <Stack direction="row" justifyContent="flex-end">
          <Box width="fit-content">
            <ButtonSpinner
              level="primary"
              label="Save"
              onClick={handleSaveTeam}
              isLoading={false}
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
        onClose={closeInviteModal}
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
          <Typography
            id="invite-member-to-team"
            component="p"
            sx={{ mb: theme.gap.medium }}
          >
            When you add a new team member, they will get access to all
            monitors.
          </Typography>
          <Field
            type="email"
            id="input-team-member"
            placeholder="Email"
            value={toInvite.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Select
            id="team-member-role"
            value={toInvite.role}
            onChange={(event) =>
              setToInvite((prev) => ({
                ...prev,
                role: event.target.value,
              }))
            }
            displayEmpty
            MenuProps={{
              PaperProps: {
                style: {
                  marginTop: theme.gap.xs,
                },
              },
              MenuListProps: {
                style: { padding: 0 },
              },
            }}
            IconComponent={KeyboardArrowDownIcon}
            sx={{ mt: theme.gap.xs }}
          >
            <MenuItem disableRipple id="role-default" value="">
              Select role
            </MenuItem>
            <MenuItem
              disableRipple
              value="admin"
              sx={{
                fontSize: "13px",
                borderRadius: `${theme.shape.borderRadius}px`,
                margin: theme.gap.xs,
              }}
            >
              Admin
            </MenuItem>
            <MenuItem
              disableRipple
              value="user"
              sx={{
                fontSize: "13px",
                borderRadius: `${theme.shape.borderRadius}px`,
                margin: theme.gap.xs,
              }}
            >
              User
            </MenuItem>
          </Select>
          <Stack
            direction="row"
            gap={theme.gap.small}
            mt={theme.gap.ml}
            justifyContent="flex-end"
          >
            <Button
              level="tertiary"
              label="Cancel"
              onClick={closeInviteModal}
            />
            <ButtonSpinner
              level="primary"
              label="Send invite"
              onClick={handleInviteMember}
              isLoading={false}
              disabled={Object.keys(errors).length !== 0}
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
