import { useTheme } from "@emotion/react";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  Modal,
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
import { networkService } from "../../../main";
import { createToast } from "../../../Utils/toastUtils";
import { useSelector } from "react-redux";
import BasicTable from "../../BasicTable";
import Remove from "../../../assets/icons/trash-bin.svg?react";
import Select from "../../Inputs/Select";

/**
 * TeamPanel component manages the organization and team members,
 * providing functionalities like renaming the organization, managing team members,
 * and inviting new members.
 *
 * @returns {JSX.Element}
 */

const TeamPanel = () => {
  const theme = useTheme();

  const { authToken, user } = useSelector((state) => state.auth);
  //TODO
  const [orgStates, setOrgStates] = useState({
    name: "Bluewave Labs",
    isEdit: false,
  });
  const [toInvite, setToInvite] = useState({
    email: "",
    role: ["0"],
  });
  const [tableData, setTableData] = useState({});
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await networkService.getAllUsers(authToken);
        setMembers(response.data.data);
      } catch (error) {
        createToast({
          body: error.message || "Error fetching team members.",
        });
      }
    };

    fetchTeam();
  }, [user]);

  useEffect(() => {
    let team = members;
    if (filter !== "all")
      team = members.filter((member) => member.role.includes(filter));

    const data = {
      cols: [
        { id: 1, name: "NAME" },
        { id: 2, name: "EMAIL" },
        { id: 3, name: "ROLE" },
        { id: 4, name: "ACTION" },
      ],
      rows: team?.map((member, idx) => {
        return {
          id: member._id,
          data: [
            {
              id: idx,
              data: (
                <Stack>
                  <Typography
                    style={{ color: theme.palette.otherColors.blackish }}
                  >
                    {member.firstName + " " + member.lastName}
                  </Typography>
                  <Typography sx={{ opacity: 0.6 }}>
                    Created {new Date(member.createdAt).toLocaleDateString()}
                  </Typography>
                </Stack>
              ),
            },
            { id: idx + 1, data: member.email },
            {
              // TODO - Add select dropdown
              id: idx + 2,
              data: member.role.includes("admin") ? "Administrator" : "Member",
            },
            {
              // TODO - Add delete onClick
              id: idx + 3,
              data: (
                <IconButton
                  aria-label="remove member"
                  sx={{
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  <Remove />
                </IconButton>
              ),
            },
          ],
        };
      }),
    };

    setTableData(data);
  }, [members, filter]);

  // RENAME ORGANIZATION
  const toggleEdit = () => {
    setOrgStates((prev) => ({ ...prev, isEdit: !prev.isEdit }));
  };
  const handleRename = () => {};

  //TODO - implement save team function
  const handleSaveTeam = () => {};

  // INVITE MEMBER
  const [isOpen, setIsOpen] = useState(false);

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

  const handleInviteMember = async () => {
    if (!toInvite.role.includes("user") || !toInvite.role.includes("admin"))
      setToInvite((prev) => ({ ...prev, role: ["user"] }));

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
        await networkService.requestInvitationToken(
          authToken,
          toInvite.email,
          toInvite.role
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
    setToInvite({ email: "", role: ["0"] });
    setErrors({});
  };

  return (
    <TabPanel value="team">
      <form className="edit-organization-form">
        <Box sx={{ alignSelf: "flex-start" }}>
          <Typography component="h1">Organization name</Typography>
        </Box>
        <Stack
          className="row-stack"
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ height: "34px" }}
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
      </form>
      <Divider
        aria-hidden="true"
        className="short-divider"
        sx={{ marginY: theme.spacing(4) }}
      />
      <form
        className="edit-team-form"
        noValidate
        spellCheck="false"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.gap.large,
        }}
      >
        <Typography component="h1">Team members</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="row"
            alignItems="flex-end"
            gap={theme.gap.medium}
            sx={{ fontSize: "14px" }}
          >
            <ButtonGroup>
              <Button
                level="secondary"
                label="All"
                onClick={() => setFilter("all")}
                sx={{
                  backgroundColor:
                    filter === "all" && theme.palette.otherColors.fillGray,
                }}
              />
              <Button
                level="secondary"
                label="Administrator"
                onClick={() => setFilter("admin")}
                sx={{
                  backgroundColor:
                    filter === "admin" && theme.palette.otherColors.fillGray,
                }}
              />
              <Button
                level="secondary"
                label="Member"
                onClick={() => setFilter("user")}
                sx={{
                  backgroundColor:
                    filter === "user" && theme.palette.otherColors.fillGray,
                }}
              />
            </ButtonGroup>
          </Stack>
          <Button
            level="primary"
            label="Invite a team member"
            sx={{ paddingX: "30px" }}
            onClick={() => setIsOpen(true)}
          />
        </Stack>
        <BasicTable data={tableData} paginated={false} reversed={true} />
        <Stack direction="row" justifyContent="flex-end">
          <Box width="fit-content">
            <ButtonSpinner
              level="primary"
              label="Save"
              onClick={handleSaveTeam}
              isLoading={false}
              loadingText="Saving..."
              disabled={true}
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
            placeholder="Select role"
            isHidden={true}
            value={toInvite.role[0]}
            onChange={(event) =>
              setToInvite((prev) => ({
                ...prev,
                role: [event.target.value],
              }))
            }
            items={[
              { _id: "admin", name: "admin" },
              { _id: "user", name: "user" },
            ]}
          />
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
