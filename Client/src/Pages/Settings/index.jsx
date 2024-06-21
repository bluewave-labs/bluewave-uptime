import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Tab, useTheme } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import "./index.css";
import ProfilePanel from "../../Components/TabPanels/ProfileSettings/ProfilePanel";
import PasswordPanel from "../../Components/TabPanels/ProfileSettings/PasswordPanel";
import TeamPanel from "../../Components/TabPanels/ProfileSettings/TeamPanel";

/**
 * Settings component renders a settings page with tabs for Profile, Password, and Team settings.
 *
 * @returns {JSX.Element}
 */

const tabList = ["Profile", "Password", "Team"];

const Settings = () => {
  const theme = useTheme();
  //(tab) 0 - Profile
  //(tab) 1 - Password
  //(tab) 2 - Team
  const [tab, setTab] = useState("0");
  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Box
      //TODO - breakpoints for responsive design
      minWidth={theme.spacing(55)}
      width="100vw"
      maxWidth="calc(100vw - 800px)"
      py={theme.spacing(5)}
      px={theme.spacing(10)}
      className="settings"
    >
      <TabContext value={tab}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: theme.palette.section.borderColor,
            "& .MuiTabs-root": { height: "fit-content", minHeight: "0" },
          }}
        >
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

Settings.propTypes = {
  // No props are being passed to this component, hence no specific PropTypes are defined.
};

export default Settings;
