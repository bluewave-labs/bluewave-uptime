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
  Modal,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
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

const tabList = ["Profile", "Password", "Team"];
const profileConfig = {
  firstName: {
    id: "edit-first-name",
    label: "First name",
    type: "input",
  },
  lastName: {
    id: "edit-last-name",
    label: "Last name",
    type: "input",
  },
  email: {
    id: "edit-email",
    label: "Email",
    description: "After updating, you'll receive a confirmation email.",
    type: "input",
  },
  photo: {
    id: "edit-photo",
    label: "Your photo",
    description: "This photo will be displayed in your profile page.",
    type: "photo",
  },
};
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
  //TODO - implement delete profile update function
  const handleUpdatePicture = () => {};

  const [isOpen, setIsOpen] = useState(false);
  //TODO - implement delete account function
  const handleDeleteAccount = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
    }, 2000);
  };
  const handleSaveProfile = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
    }, 2000);
  };

  const [showPassword, setShowPassword] = useState(false);

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
        <TabPanel
          value="0"
          sx={{ padding: "0", marginTop: theme.spacing(6.25), width: "100%" }}
        >
          <form className="edit-profile-form" noValidate spellCheck="false">
            {Object.entries(profileConfig).map(([key, field]) => (
              <div className="edit-profile-form__wrapper" key={key}>
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
                      fontWeight: "600",
                    }}
                  >
                    {field.label}
                  </Typography>
                  {field ? (
                    <Typography
                      variant="h5"
                      component="p"
                      sx={{
                        color: theme.palette.secondary.main,
                        opacity: 0.6,
                        fontSize: "13px",
                      }}
                    >
                      {field.description}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Stack>
                {field.type === "input" ? (
                  <TextField
                    id={field.id}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    sx={{
                      flex: 1,
                      minWidth: theme.spacing(30),
                    }}
                  ></TextField>
                ) : field.type === "photo" ? (
                  <Stack direction="row" alignItems="center" sx={{ flex: 1 }}>
                    {/* TODO - Use Avatar component instead of @mui */}
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                      className="icon-button-avatar"
                      style={{ width: "64px", height: "64px" }}
                    />
                    <ButtonSpinner
                      level="tertiary"
                      label="Delete"
                      onClick={handleDeletePicture}
                      isLoading={isLoading}
                      sx={{
                        height: "fit-content",
                        fontSize: "13px",
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
                        height: "fit-content",
                        color: theme.palette.primary.main,
                        fontSize: "13px",
                        "&:focus": {
                          outline: "none",
                        },
                      }}
                    />
                  </Stack>
                ) : (
                  ""
                )}
              </div>
            ))}
          </form>
          <Divider aria-hidden="true" sx={{ marginY: theme.spacing(6.25) }} />
          <form className="delete-profile-form" noValidate spellCheck="false">
            <div className="delete-profile-form__wrapper">
              <Stack direction="column" gap="15px">
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Delete account
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
                    label="Delete account"
                    onClick={() => setIsOpen(true)}
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
          <Divider
            aria-hidden="true"
            width="0"
            sx={{ marginY: theme.spacing(6.25) }}
          />
          {/* !!! - All save buttons are tied to the same state */}
          {/* TODO - Implement Save Profile function */}
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
        </TabPanel>
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
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
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
          </form>
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
        </TabPanel>
        <TabPanel value="2">Team</TabPanel>
      </TabContext>
      {/* TODO - Update ModalPopup Component with @mui for reusability */}
      {/* <DualButtonPopupModal
        subject="Really delete this account?"
        description="If you delete your account, you will no longer be able to sign in, and all of your data will be deleted. Deleting your account is permanent and non-recoverable action."
        esc="Cancel"
        save="Delete account"
      /> */}
      <Modal
        aria-labelledby="modal-delete-account"
        aria-describedby="delete-account-confirmation"
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
            borderRadius: "4px",
            boxShadow: 24,
            p: "30px",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography
            id="modal-delete-account"
            variant="h4"
            component="h1"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Really delete this account?
          </Typography>
          <Typography
            id="delete-account-confirmation"
            variant="h4"
            component="p"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "13px",
            }}
          >
            If you delete your account, you will no longer be able to sign in,
            and all of your data will be deleted. Deleting your account is
            permanent and non-recoverable action.
          </Typography>
          <Stack direction="row" gap="10px" mt="10px" justifyContent="flex-end">
            <Button
              level="tertiary"
              label="Cancel"
              onClick={() => setIsOpen(false)}
              sx={{ fontSize: "13px" }}
            />
            <ButtonSpinner
              level="error"
              label="Delete account"
              onClick={handleDeleteAccount}
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
