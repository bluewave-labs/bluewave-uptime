import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from "react";
// import AnnouncementsDualButtonWithIcon from "../../Announcements/AnnouncementsDualButtonWithIcon/AnnouncementsDualButtonWithIcon";
import AnnouncementsDualButtonWithIcon from "../../Toast/AnnouncementsDualButtonWithIcon/AnnouncementsDualButtonWithIcon";
import { useTheme } from "@emotion/react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ButtonSpinner from "../../ButtonSpinner";
import PasswordTextField from "../../TextFields/Password/PasswordTextField";
import { editPasswordValidation } from "../../../Validation/validation";

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
  const idToName = {
    "edit-current-password": "password",
    //TBD - form field naming
    "edit-new-password": "newpassword",
    "edit-confirm-password": "confirm",
  };
  const [localData, setLocalData] = useState({
    password: "",
    newpassword: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { value, id } = event.target;
    const name = idToName[id];
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const validation = editPasswordValidation.validate(
      { [name]: value },
      { abortEarly: false, context: { newpassword: localData.newpassword } }
    );

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      if (validation.error) {
        updatedErrors[name] = validation.error.details[0].message;
      } else {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { error } = editPasswordValidation.validate(localData, {
      abortEarly: false,
      context: { newpassword: localData.newpassword },
    });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      setIsLoading(false);
    } else {
      //TODO - submit logic
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <TabPanel value="password">
      <form
        onSubmit={handleSubmit}
        className="edit-password-form"
        noValidate
        spellCheck="false"
      >
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
            <Typography component="h1">Current password</Typography>
          </Stack>
          <Stack>
            <PasswordTextField
              id="edit-current-password"
              label={null}
              placeholder="Enter your current password"
              autoComplete="current-password"
              visibility={showPassword}
              setVisibility={setShowPassword}
              onChange={handleChange}
              error={errors[idToName["edit-current-password"]] ? true : false}
            />
            {errors[idToName["edit-current-password"]] ? (
              <Typography component="p" className="input-error">
                {errors[idToName["edit-current-password"]]}
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </div>
        <div className="edit-password-form__wrapper">
          <Stack>
            <Typography component="h1">New password</Typography>
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
              error={errors[idToName["edit-new-password"]] ? true : false}
            />
            {errors[idToName["edit-new-password"]] ? (
              <Typography component="p" className="input-error">
                {errors[idToName["edit-new-password"]]}
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </div>
        <div className="edit-password-form__wrapper">
          <Stack>
            <Typography component="h1">Confirm new password</Typography>
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
              error={errors[idToName["edit-confirm-password"]] ? true : false}
            />
            {errors[idToName["edit-confirm-password"]] ? (
              <Typography component="p" className="input-error">
                {errors[idToName["edit-confirm-password"]]}
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
              onClick={handleSubmit}
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
