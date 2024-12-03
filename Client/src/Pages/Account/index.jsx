import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Box, Tab, useTheme } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ProfilePanel from "../../Components/TabPanels/Account/ProfilePanel";
import PasswordPanel from "../../Components/TabPanels/Account/PasswordPanel";
import TeamPanel from "../../Components/TabPanels/Account/TeamPanel";
import "./index.css";

/**
 * Account component renders a settings page with tabs for Profile, Password, and Team settings.
 * @param {string} [props.open] - Specifies the initially open tab: 'profile', 'password', or 'team'.
 * @returns {JSX.Element}
 */
const Account = ({ open = "profile" }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [focusedTab, setFocusedTab] = useState(null); // Track focused tab
	const tab = open;
	const handleTabChange = (event, newTab) => {
		navigate(`/account/${newTab}`);
	};
	const { user } = useSelector((state) => state.auth);

	const requiredRoles = ["superadmin", "admin"];
	let tabList = ["Profile", "Password", "Team"];
	const hideTeams = !requiredRoles.some((role) => user.role.includes(role));
	if (hideTeams) {
		tabList = ["Profile", "Password"];
	}

	// Remove password for demo
	if (user.role.includes("demo")) {
		tabList = ["Profile"];
	}

	const handleKeyDown = (event) => {
		const currentIndex = tabList.findIndex((label) => label.toLowerCase() === tab);
		if (event.key === "Tab") {
			const nextIndex = (currentIndex + 1) % tabList.length;
			setFocusedTab(tabList[nextIndex].toLowerCase());
		} else if (event.key === "Enter") {
			event.preventDefault();
			navigate(`/account/${focusedTab}`);
		}
	};

	const handleFocus = (tabName) => {
		setFocusedTab(tabName);
	};

	return (
		<Box
			className="account"
			px={theme.spacing(20)}
			py={theme.spacing(12)}
			border={1}
			borderColor={theme.palette.border.light}
			borderRadius={theme.shape.borderRadius}
			backgroundColor={theme.palette.background.main}
		>
			<TabContext value={tab}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: theme.palette.border.light,
						"& .MuiTabs-root": { height: "fit-content", minHeight: "0" },
					}}
				>
					<TabList
						onChange={handleTabChange}
						aria-label="account tabs"
					>
						{tabList.map((label, index) => (
							<Tab
								label={label}
								key={index}
								value={label.toLowerCase()}
								onKeyDown={handleKeyDown}
								onFocus={() => handleFocus(label.toLowerCase())}
								tabIndex={index}
								sx={{
									fontSize: 13,
									color: theme.palette.text.tertiary,
									textTransform: "none",
									minWidth: "fit-content",
									minHeight: 0,
									paddingLeft: 0,
									paddingY: theme.spacing(4),
									fontWeight: 400,
									marginRight: theme.spacing(8),
									"&:focus": {
										borderBottom: `2px solid ${theme.palette.border.light}`,
									},

									"&:hover": {
										borderBottom: `2px solid ${theme.palette.border.light}`,
									},
								}}
							/>
						))}
					</TabList>
				</Box>
				<ProfilePanel />
				{user.role.includes("superadmin") && <PasswordPanel />}
				{!hideTeams && <TeamPanel />}
			</TabContext>
		</Box>
	);
};

Account.propTypes = {
	open: PropTypes.oneOf(["profile", "password", "team"]),
};

export default Account;
