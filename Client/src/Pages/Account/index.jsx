import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Tab, useTheme } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import "./index.css";
import ProfilePanel from "../../Components/TabPanels/Account/ProfilePanel";
import PasswordPanel from "../../Components/TabPanels/Account/PasswordPanel";
import TeamPanel from "../../Components/TabPanels/Account/TeamPanel";
import { useNavigate } from "react-router";

/**
 * Account component renders a settings page with tabs for Profile, Password, and Team settings.
 * @param {string} [props.open] - Specifies the initially open tab: 'profile', 'password', or 'team'.
 * @returns {JSX.Element}
 */

const tabList = ["Profile", "Password", "Team"];

const Account = ({ open = "profile" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const tab = open;
  const handleTabChange = (event, newTab) => {
    navigate(`/account/${newTab}`);
  };

  return (
    <Box
      //TODO - breakpoints for responsive design
      minWidth={theme.spacing(55)}
      maxWidth="1200px"
      py={theme.content.pY}
      px={theme.content.pX}
      className="account"
    >
      <TabContext value={tab}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: theme.palette.section.borderColor,
            "& .MuiTabs-root": { height: "fit-content", minHeight: "0" },
          }}
        >
          <TabList onChange={handleTabChange} aria-label="account tabs">
            {tabList.map((label, index) => (
              <Tab
                label={label}
                key={index}
                value={label.toLowerCase()}
                sx={{
                  fontSize: "13px",
                  color: theme.palette.secondary.main,
                  textTransform: "none",
                  minWidth: "fit-content",
                  minHeight: 0,
                  paddingLeft: "0",
                  paddingY: "10px",
                  marginRight: "20px",
                  "&:focus": {
                    outline: "none",
                  },
                  "& .MuiTouchRipple-root": {
                    pointerEvents: "none",
                    display: "none",
                  },
                }}
              />
            ))}
          </TabList>
        </Box>
        <ProfilePanel />
        <PasswordPanel />
        <TeamPanel />
      </TabContext>
    </Box>
  );
};

Account.propTypes = {
  open: PropTypes.oneOf(["profile", "password", "team"]),
};

export default Account;
