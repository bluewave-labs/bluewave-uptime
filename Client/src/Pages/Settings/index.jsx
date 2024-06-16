import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  useTheme,
  TextField,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import "./index.css";

import ButtonSpinner from "../../Components/ButtonSpinner";
import Button from "../../Components/Button";

const tabList = ["Profile", "Password", "Team"];

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
  //TODO - implement delete profile picture function
  const handleDeletePicture = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const handleUpdatePicture = () => {};
  const handleDeleteAccount = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <Box
      flexDirection="column"
      //TODO - need to figure out document sizing
      //TODO - breakpoints for responsive design
      height="calc(100vh - 104px)"
      minWidth={theme.spacing(55)}
      width="100vw"
      maxWidth="calc(100vw - 700px)"
      mt={theme.spacing(8)}
      pt={theme.spacing(5)}
      px={theme.spacing(10)}
    >
      <TabContext value={tab}>
        <Box width="100%" sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="setting tabs">
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
        <TabPanel
          value="0"
          sx={{ padding: "0", marginTop: theme.spacing(6.25), width: "100%" }}
        >
          <form className="edit-profile-form" noValidate spellCheck="false">
            <div className="edit-profile-form__wrapper">
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  flex: 1,
                  color: theme.palette.secondary.main,
                  fontSize: "13px",
                  fontWeight: "700",
                  marginRight: "10px",
                }}
              >
                First Name
              </Typography>
              <TextField
                id="edit-first-name"
                placeholder="Enter your first name"
                sx={{
                  flex: 1,
                  minWidth: theme.spacing(30),
                }}
              ></TextField>
            </div>
            <div className="edit-profile-form__wrapper">
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  flex: 1,
                  color: theme.palette.secondary.main,
                  fontSize: "13px",
                  fontWeight: "700",
                  marginRight: "10px",
                }}
              >
                Last Name
              </Typography>
              <TextField
                id="edit-last-name"
                placeholder="Enter your last name"
                sx={{
                  flex: 1,
                  minWidth: theme.spacing(30),
                }}
              ></TextField>
            </div>
            <div className="edit-profile-form__wrapper">
              <Stack
                direction="column"
                gap="8px"
                sx={{
                  flex: 1,
                  marginRight: "10px",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Email
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{
                    color: theme.palette.secondary.main,
                    opacity: 0.6,
                    fontSize: "13px",
                  }}
                >
                  After updating, you'll receive a confirmation email.
                </Typography>
              </Stack>
              <TextField
                id="edit-email"
                placeholder="Enter your email"
                sx={{
                  flex: 1,
                  minWidth: theme.spacing(30),
                }}
              ></TextField>
            </div>
            <div className="edit-profile-form__wrapper">
              <Stack
                direction="column"
                gap="8px"
                sx={{ flex: 1, marginRight: "10px" }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Your Photo
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{
                    color: theme.palette.secondary.main,
                    opacity: 0.6,
                    fontSize: "13px",
                  }}
                >
                  This photo will be displayed in your profile page.
                </Typography>
              </Stack>
              <Stack direction="row" alignContent="center" sx={{ flex: 1 }}>
                {/* TODO - Use Avatar component instead of @mui */}
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                  className="icon-button-avatar"
                  style={{ width: "64px", height: "64px" }}
                />
                {/* TODO - delete pfp functionality */}
                <ButtonSpinner
                  level="tertiary"
                  label="Delete"
                  onClick={handleDeletePicture}
                  isLoading={isLoading}
                  sx={{
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                />
                {/* TODO - modal popup for update pfp? */}
                <Button
                  level="tertiary"
                  label="Update"
                  onClick={handleUpdatePicture}
                  sx={{
                    color: theme.palette.primary.main,
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                />
              </Stack>
            </div>
          </form>
          <Divider sx={{ marginY: theme.spacing(6.25) }} />
          <form className="delete-profile-form" noValidate spellCheck="false">
            <div className="delete-profile-form__wrapper">
              <Stack direction="column" gap="15px">
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Delete Account
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{
                    color: theme.palette.secondary.main,
                    opacity: 0.6,
                    fontSize: "13px",
                  }}
                >
                  Note that deleting your account will remove all data from our
                  system. This is permanent and non-recoverable.
                </Typography>
                <Box sx={{ mt: theme.spacing(1) }}>
                  <Button
                    level="error"
                    label="Delete Account"
                    onClick={handleDeleteAccount}
                    sx={{
                      fontSize: "13px",
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                  />
                </Box>
              </Stack>
            </div>
          </form>
        </TabPanel>
        <TabPanel value="1">Password</TabPanel>
        <TabPanel value="2">Team</TabPanel>
      </TabContext>
    </Box>
  );
};

export default Settings;
