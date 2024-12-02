import { useTheme } from "@emotion/react";
import TabPanel from "@mui/lab/TabPanel";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TextInput from "../../Inputs/TextInput";
import { credentials } from "../../../Validation/validation";
import { networkService } from "../../../main";
import { createToast } from "../../../Utils/toastUtils";
import { useSelector } from "react-redux";
import BasicTable from "../../BasicTable";
import Select from "../../Inputs/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import { GenericDialog } from "../../Dialog/genericDialog";

/**
 * TeamPanel component manages the organization and team members,
 * providing functionalities like renaming the organization, managing team members,
 * and inviting new members.
 *
 * @returns {JSX.Element}
 */

const TeamPanel = () => {
	const roleMap = {
		superadmin: "Super admin",
		admin: "Admin",
		user: "Team member",
		demo: "Demo User",
	};

	const theme = useTheme();

	const { authToken, user } = useSelector((state) => state.auth);
	//TODO
	// const [orgStates, setOrgStates] = useState({
	// 	name: "Bluewave Labs",
	// 	isEdit: false,
	// });
	const [toInvite, setToInvite] = useState({
		email: "",
		role: ["0"],
	});
	const [tableData, setTableData] = useState({});
	const [members, setMembers] = useState([]);
	const [filter, setFilter] = useState("all");
	const [isDisabled, setIsDisabled] = useState(true);
	const [errors, setErrors] = useState({});
	const [isSendingInvite, setIsSendingInvite] = useState(false);

	useEffect(() => {
		const fetchTeam = async () => {
			try {
				const response = await networkService.getAllUsers({
					authToken: authToken,
				});
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
			team = members.filter((member) => {
				if (filter === "admin") {
					return member.role.includes("admin") || member.role.includes("superadmin");
				}
				return member.role.includes(filter);
			});

		const data = {
			cols: [
				{ id: 1, name: "NAME" },
				{ id: 2, name: "EMAIL" },
				{ id: 3, name: "ROLE" },
				// FEATURE STILL TO BE IMPLEMENTED
				// { id: 4, name: "ACTION" },
			],
			rows: team?.map((member, idx) => {
				const roles = member.role.map((role) => roleMap[role]).join(",");
				return {
					id: member._id,
					data: [
						{
							id: idx,
							data: (
								<Stack>
									<Typography color={theme.palette.text.secondary}>
										{member.firstName + " " + member.lastName}
									</Typography>
									<Typography>
										Created {new Date(member.createdAt).toLocaleDateString()}
									</Typography>
								</Stack>
							),
						},
						{ id: idx + 1, data: member.email },
						{
							// TODO - Add select dropdown
							id: idx + 2,
							data: roles,
						},
						// FEATURE STILL TO BE IMPLEMENTED
						// {
						//   // TODO - Add delete onClick
						//   id: idx + 3,
						//   data: (
						//     <IconButton
						//       aria-label="remove member"
						//       sx={{
						//         "&:focus": {
						//           outline: "none",
						//         },
						//       }}
						//     >
						//       <Remove />
						//     </IconButton>
						//   ),
						// },
					],
				};
			}),
		};

		setTableData(data);
	}, [members, filter]);
	useEffect(() => {
		setIsDisabled(Object.keys(errors).length !== 0 || toInvite.email === "");
	}, [errors, toInvite.email]);

	// RENAME ORGANIZATION
	// const toggleEdit = () => {
	// 	setOrgStates((prev) => ({ ...prev, isEdit: !prev.isEdit }));
	// };
	// const handleRename = () => {};

	// INVITE MEMBER
	const [isOpen, setIsOpen] = useState(false);

	const handleChange = (event) => {
		const { value } = event.target;
		setToInvite((prev) => ({
			...prev,
			email: value,
		}));

		const validation = credentials.validate({ email: value }, { abortEarly: false });

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
		if (!toInvite.email) {
			setErrors((prev) => ({ ...prev, email: "Email is required." }));
			return;
		}
		setIsSendingInvite(true);
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
			return;
		}

		try {
			await networkService.requestInvitationToken({
				authToken: authToken,
				email: toInvite.email,
				role: toInvite.role,
			});
			closeInviteModal();
			createToast({
				body: "Member invited. They will receive an email with details on how to create their account.",
			});
		} catch (error) {
			createToast({
				body: error.message || "Unknown error.",
			});
		} finally {
			setIsSendingInvite(false);
		}
	};

	const closeInviteModal = () => {
		setIsOpen(false);
		setToInvite({ email: "", role: ["0"] });
		setErrors({});
	};

	return (
		<TabPanel
			className="team-panel table-container"
			value="team"
			sx={{
				"& h1": {
					color: theme.palette.text.tertiary,
				},
				"& .MuiTable-root .MuiTableBody-root .MuiTableCell-root, & .MuiTable-root p + p":
					{
						color: theme.palette.text.accent,
					},
			}}
		>
			{/* FEATURE STILL TO BE IMPLEMENTED */}
			{/* <Stack component="form">
        <Box sx={{ alignSelf: "flex-start" }}>
          <Typography component="h1">Organization name</Typography>
        </Box>
        <Stack
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
              sx: { textAlign: "end", padding: theme.spacing(4) },
            }}
          />
          <Button
            level={orgStates.isEdit ? "secondary" : "tertiary"}
            label={orgStates.isEdit ? "Save" : ""}
            img={!orgStates.isEdit ? <EditSvg /> : ""}
            onClick={() => toggleEdit()}
            sx={{
              minWidth: 0,
              paddingX: theme.spacing(4),
              ml: orgStates.isEdit ? theme.spacing(4) : 0,
            }}
          />
        </Stack>
      </Stack>
      <Divider aria-hidden="true" sx={{ marginY: theme.spacing(4) }} /> */}
			<Stack
				component="form"
				noValidate
				spellCheck="false"
				gap={theme.spacing(12)}
			>
				<Typography component="h1">Team members</Typography>
				<Stack
					direction="row"
					justifyContent="space-between"
				>
					<Stack
						direction="row"
						alignItems="flex-end"
						gap={theme.spacing(6)}
						sx={{ fontSize: 14 }}
					>
						<ButtonGroup>
							<Button
								variant="group"
								filled={(filter === "all").toString()}
								onClick={() => setFilter("all")}
							>
								All
							</Button>
							<Button
								variant="group"
								filled={(filter === "admin").toString()}
								onClick={() => setFilter("admin")}
							>
								Administrator
							</Button>
							<Button
								variant="group"
								filled={(filter === "user").toString()}
								onClick={() => setFilter("user")}
							>
								Member
							</Button>
						</ButtonGroup>
					</Stack>
					<LoadingButton
						loading={isSendingInvite}
						variant="contained"
						color="primary"
						onClick={() => setIsOpen(true)}
					>
						Invite a team member
					</LoadingButton>
				</Stack>
				<BasicTable
					data={tableData}
					paginated={false}
					reversed={true}
					table={"team"}
				/>
			</Stack>

			<GenericDialog
				title={"Invite new team member"}
				description={
					"When you add a new team member, they will get access to all monitors."
				}
				open={isOpen}
				onClose={closeInviteModal}
				theme={theme}
			>
				<TextInput
					marginBottom={theme.spacing(12)}
					type="email"
					id="input-team-member"
					placeholder="Email"
					value={toInvite.email}
					onChange={handleChange}
					error={errors.email ? true : false}
					helperText={errors.email}
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
						{ _id: "admin", name: "Admin" },
						{ _id: "user", name: "User" },
					]}
				/>
				<Stack
					direction="row"
					gap={theme.spacing(4)}
					mt={theme.spacing(8)}
					justifyContent="flex-end"
				>
					<LoadingButton
						loading={isSendingInvite}
						variant="text"
						color="info"
						onClick={closeInviteModal}
					>
						Cancel
					</LoadingButton>
					<LoadingButton
						variant="contained"
						color="primary"
						onClick={handleInviteMember}
						loading={isSendingInvite}
						disabled={isDisabled}
					>
						Send invite
					</LoadingButton>
				</Stack>
			</GenericDialog>
		</TabPanel>
	);
};

TeamPanel.propTypes = {
	// No props are being passed to this component, hence no specific PropTypes are defined.
};

export default TeamPanel;
