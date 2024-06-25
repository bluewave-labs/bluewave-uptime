import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from "react";
import AnnouncementsDualButtonWithIcon from "../../Announcements/AnnouncementsDualButtonWithIcon/AnnouncementsDualButtonWithIcon";
import { useTheme } from "@emotion/react";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ButtonSpinner from "../../ButtonSpinner";

/**
 * PasswordPanel component manages the form for editing password.
 *
 * @returns {JSX.Element}
 */

const PasswordPanel = () => {
  const theme = useTheme();
  //TODO - use redux loading state
  //!! - currently all loading buttons are tied to the same state
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //TODO - implement save password function
  const handleSavePassword = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
    }, 2000);
  };
  return (
    <TabPanel value="1">
      <form className="edit-password-form" noValidate spellCheck="false">
        <div className="edit-password-form__wrapper">
          <AnnouncementsDualButtonWithIcon
            icon={<InfoOutlinedIcon style={{ fill: theme.palette.secondary.main }} />}
            subject="SSO login"
            body="Since you logged in via SSO, you cannot reset or modify your password."
          />
        </div>
        <div className="edit-password-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              Current Password
            </Typography>
          </Stack>
          <FormControl sx={{ flex: 1 }}>
            <OutlinedInput
              id="edit-current-password"
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
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
          </FormControl>
        </div>
        <div className="edit-password-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              Password
            </Typography>
          </Stack>
          <FormControl sx={{ flex: 1 }}>
            <OutlinedInput
              id="edit-password"
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
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
          </FormControl>
        </div>
        <div className="edit-password-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              Confirm new password
            </Typography>
          </Stack>
          <Box sx={{ flex: 1 }}>
            <AnnouncementsDualButtonWithIcon
              icon={<WarningAmberOutlinedIcon style={{ fill: "#f79009" }} />}
              body="New password must contain at least 8 characters and must have at least one uppercase letter, one number and one symbol."
            />
          </Box>
        </div>
        <Divider aria-hidden="true" width="0" />
        <Stack direction="row" justifyContent="flex-end">
          <Box width="fit-content">
            <ButtonSpinner
              level="primary"
              label="Save"
              onClick={handleSavePassword}
              isLoading={isLoading}
              loadingText="Saving..."
              sx={{
                paddingX: "40px",
              }}
            />
          </Box>
        </Stack>
      </form>
    </TabPanel>
  );
};

PasswordPanel.propTypes = {
  // No props are being passed to this component, hence no specific PropTypes are defined.
};

export default PasswordPanel;
