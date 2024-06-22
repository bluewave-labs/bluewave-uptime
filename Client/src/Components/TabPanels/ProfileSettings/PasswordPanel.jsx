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
import PasswordTextField from "../../TextFields/Password/PasswordTextField";

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

  //for testing, will tweak when I implement redux slice
  const [localData, setLocalData] = useState({
    "edit-current-password": {
      value: "",
      //TBD
      type: "",
    },
    "edit-new-password": {
      value: "",
      type: "password",
    },
    "edit-confirm-password": {
      value: "",
      type: "confirm",
    },
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { value, id } = event.target;
    setLocalData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        value: value,
      },
    }));
    validateField(id, value);
  };

  const validateField = (id, value) => {
    let error = "";
    switch (localData[id].type) {
      case "password":
        error =
          value.trim() === ""
            ? "*This field is required."
            : value.length < 8
            ? "*Password must be at least 8 characters long."
            : !/[A-Z]/.test(value)
            ? "*Password must contain at least one uppercase letter."
            : !/\d/.test(value)
            ? "*Password must contain at least one number."
            : !/[!@#$%^&*]/.test(value)
            ? "*Password must contain at least one symbol."
            : "";
        break;
      case "confirm":
        error =
          value.trim() === ""
            ? "*This field is required."
            : value !== localData["edit-new-password"].value
            ? "*Passwords do not match."
            : "";
        break;
      default:
        break;
    }

    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (error === "") {
        delete updatedErrors[id];
      } else {
        updatedErrors[id] = error;
      }
      return updatedErrors;
    });
  };

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
            icon={
              <InfoOutlinedIcon
                style={{ fill: theme.palette.secondary.main }}
              />
            }
            subject="SSO login"
            body="Since you logged in via SSO, you cannot reset or modify your password."
          />
        </div>
        <div className="edit-password-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              Current password
            </Typography>
          </Stack>
          <Stack>
            <PasswordTextField
              id="edit-current-password"
              label={null}
              placeholder="Enter your current password"
              autoComplete="current-password"
              visibility={showPassword}
              setVisibility={setShowPassword}
            />
          </Stack>
        </div>
        <div className="edit-password-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              New password
            </Typography>
          </Stack>
          <Stack>
            <PasswordTextField
              id="edit-new-password"
              label={null}
              placeholder="Enter your new password"
              autoComplete="new-password"
              visibility={showPassword}
              setVisibility={setShowPassword}
              onChange={handleChange}
              error={errors["edit-new-password"] ? true : false}
            />
            {errors["edit-new-password"] ? (
              <Typography variant="h5" component="p" className="input-error">
                {errors["edit-new-password"]}
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </div>
        <div className="edit-password-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              Confirm new password
            </Typography>
          </Stack>
          <Stack>
            <PasswordTextField
              id="edit-confirm-password"
              label={null}
              placeholder="Reenter your new password"
              autoComplete="new-password"
              visibility={showPassword}
              setVisibility={setShowPassword}
              onChange={handleChange}
              error={errors["edit-confirm-password"] ? true : false}
            />
            {errors["edit-confirm-password"] ? (
              <Typography variant="h5" component="p" className="input-error">
                {errors["edit-confirm-password"]}
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </div>
        <div className="edit-password-form__wrapper">
          <Stack></Stack>
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
              disabled={Object.keys(errors).length !== 0 && true}
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
