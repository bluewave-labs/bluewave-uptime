import { useTheme } from "@emotion/react";
import { useRef, useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider, Modal, Stack, Typography } from "@mui/material";
import ButtonSpinner from "../../ButtonSpinner";
import Button from "../../Button";
import Avatar from "../../Avatar";
import Field from "../../Inputs/Field";
import ImageField from "../../Inputs/Image";
import { credentials, imageValidation } from "../../../Validation/validation";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthState,
  deleteUser,
  update,
} from "../../../Features/Auth/authSlice";
import ImageIcon from "@mui/icons-material/Image";
import ProgressUpload from "../../ProgressBars";
import { formatBytes } from "../../../Utils/fileUtils";
import { clearUptimeMonitorState } from "../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import { createToast } from "../../../Utils/toastUtils";
import { logger } from "../../../Utils/Logger";

/**
 * ProfilePanel component displays a form for editing user profile information
 * and allows for actions like updating profile picture, credentials,
 * and deleting account.
 *
 * @returns {JSX.Element}
 */

const ProfilePanel = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  //redux state
  const { user, authToken, isLoading } = useSelector((state) => state.auth);

  const idToName = {
    "edit-first-name": "firstName",
    "edit-last-name": "lastName",
    // Disabled for now, will revisit in the future
    // "edit-email": "email",
  };

  // Local state for form data, errors, and file handling
  const [localData, setLocalData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    // email: user.email, // Disabled for now
  });
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState();
  const intervalRef = useRef(null);
  const [progress, setProgress] = useState({ value: 0, isLoading: false });

  // Handles input field changes and performs validation
  const handleChange = (event) => {
    errors["unchanged"] && clearError("unchanged");
    const { value, id } = event.target;
    const name = idToName[id];
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField({ [name]: value }, credentials, name);
  };

  // Handles image file
  const handlePicture = (event) => {
    const pic = event.target.files[0];
    let error = validateField(
      { type: pic.type, size: pic.size },
      imageValidation
    );
    if (error) return;

    setProgress((prev) => ({ ...prev, isLoading: true }));
    setFile({
      src: URL.createObjectURL(pic),
      name: pic.name,
      size: formatBytes(pic.size),
      delete: false,
    });

    //TODO - potentitally remove, will revisit in the future
    intervalRef.current = setInterval(() => {
      const buffer = 12;
      setProgress((prev) => {
        if (prev.value + buffer >= 100) {
          clearInterval(intervalRef.current);
          return { value: 100, isLoading: false };
        }
        return { ...prev, value: prev.value + buffer };
      });
    }, 120);
  };

  // Validates input against provided schema and updates error state
  const validateField = (toValidate, schema, name = "picture") => {
    const { error } = schema.validate(toValidate, { abortEarly: false });
    setErrors((prev) => {
      const prevErrors = { ...prev };
      if (error) prevErrors[name] = error.details[0].message;
      else delete prevErrors[name];
      return prevErrors;
    });
    if (error) return true;
  };

  // Clears specific error from errors state
  const clearError = (err) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (updatedErrors[err]) delete updatedErrors[err];
      return updatedErrors;
    });
  };

  // Resets picture-related states and clears interval
  const removePicture = () => {
    errors["picture"] && clearError("picture");
    setFile({ delete: true });
    clearInterval(intervalRef.current); // interrupt interval if image upload is canceled prior to completing the process
    setProgress({ value: 0, isLoading: false });
  };

  // Opens the picture update modal
  const openPictureModal = () => {
    setIsOpen("picture");
    setFile({ delete: localData.deleteProfileImage });
  };

  // Closes the picture update modal and resets related states
  const closePictureModal = () => {
    errors["picture"] && clearError("picture");
    setFile(); //reset file
    clearInterval(intervalRef.current); // interrupt interval if image upload is canceled prior to completing the process
    setProgress({ value: 0, isLoading: false });
    setIsOpen("");
  };

  // Updates profile image displayed on UI
  const handleUpdatePicture = () => {
    setProgress({ value: 0, isLoading: false });
    setLocalData((prev) => ({
      ...prev,
      file: file.src,
      deleteProfileImage: false,
    }));
    setIsOpen("");
    errors["unchanged"] && clearError("unchanged");
  };

  // Handles form submission to update user profile
  const handleSaveProfile = async (event) => {
    event.preventDefault();
    if (
      localData.firstName === user.firstName &&
      localData.lastName === user.lastName &&
      localData.deleteProfileImage === undefined &&
      localData.file === undefined
    ) {
      createToast({
        body: "Unable to update profile — no changes detected.",
      });
      setErrors({ unchanged: "unable to update profile" });
      return;
    }

    const action = await dispatch(update({ authToken, localData }));
    if (action.payload.success) {
      createToast({
        body: "Your profile data was changed successfully.",
      });
    } else {
      createToast({
        body: "There was an error updating your profile data.",
      });
    }
  };

  // Removes current profile image from UI
  const handleDeletePicture = () => {
    setLocalData((prev) => ({
      ...prev,
      deleteProfileImage: true,
    }));
    errors["unchanged"] && clearError("unchanged");
  };

  // Initiates the account deletion process
  const handleDeleteAccount = async () => {
    const action = await dispatch(deleteUser(authToken));
    if (action.payload.success) {
      dispatch(clearAuthState());
      dispatch(clearUptimeMonitorState());
    } else {
      if (action.payload) {
        // dispatch errors
        createToast({
          body: action.payload.msg,
        });
      } else {
        // unknown errors
        createToast({
          body: "Unknown error.",
        });
      }
    }
  };

  // Modal state and control functions
  const [isOpen, setIsOpen] = useState("");
  const isModalOpen = (name) => isOpen === name;

  return (
    <TabPanel value="profile">
      <form className="edit-profile-form" noValidate spellCheck="false">
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography component="h1">First name</Typography>
          </Stack>
          <Field
            id="edit-first-name"
            value={localData.firstName}
            placeholder="Enter your first name"
            autoComplete="given-name"
            onChange={handleChange}
            error={errors[idToName["edit-first-name"]]}
          />
        </div>
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography component="h1">Last name</Typography>
          </Stack>
          <Field
            id="edit-last-name"
            placeholder="Enter your last name"
            autoComplete="family-name"
            value={localData.lastName}
            onChange={handleChange}
            error={errors[idToName["edit-last-name"]]}
          />
        </div>
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography component="h1">Email</Typography>
            <Typography component="p">
              This is your current email address — it cannot be changed.
            </Typography>
          </Stack>
          <Field
            id="edit-email"
            value={user.email}
            placeholder="Enter your email"
            autoComplete="email"
            // TODO - add onChange
            onChange={() => logger.warn("disabled")}
            // error={errors[idToName["edit-email"]]}
            disabled={true}
          />
        </div>
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography component="h1">Your photo</Typography>
            <Typography component="p">
              This photo will be displayed in your profile page.
            </Typography>
          </Stack>
          <Stack className="row-stack" direction="row" alignItems="center">
            <Avatar
              src={
                localData?.deleteProfileImage
                  ? "/static/images/avatar/2.jpg"
                  : localData?.file
                  ? localData.file
                  : ""
              }
              sx={{ mr: "8px" }}
            />
            <Button
              level="tertiary"
              label="Delete"
              onClick={handleDeletePicture}
            />
            <Button
              level="tertiary"
              label="Update"
              onClick={openPictureModal}
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Stack>
        </div>
        <Divider
          aria-hidden="true"
          className="short-divider"
          width="0"
          sx={{ marginY: theme.spacing(1) }}
        />
        <Stack direction="row" justifyContent="flex-end">
          <Box width="fit-content">
            <ButtonSpinner
              level="primary"
              label="Save"
              onClick={handleSaveProfile}
              isLoading={isLoading}
              loadingText="Saving..."
              disabled={
                Object.keys(errors).length !== 0 && !errors?.picture && true
              }
              sx={{
                paddingX: "40px",
              }}
            />
          </Box>
        </Stack>
      </form>
      <Divider aria-hidden="true" />
      <form className="delete-profile-form" noValidate spellCheck="false">
        <div className="delete-profile-form__wrapper">
          <Stack direction="column" gap="15px">
            <Typography component="h1">Delete account</Typography>
            <Typography component="p">
              Note that deleting your account will remove all data from our
              system. This is permanent and non-recoverable.
            </Typography>
            <Box sx={{ mt: theme.spacing(1) }}>
              <Button
                level="error"
                label="Delete account"
                onClick={() => setIsOpen("delete")}
              />
            </Box>
          </Stack>
        </div>
      </form>
      {/* TODO - Update ModalPopup Component with @mui for reusability */}
      <Modal
        aria-labelledby="modal-delete-account"
        aria-describedby="delete-account-confirmation"
        open={isModalOpen("delete")}
        onClose={() => setIsOpen("")}
        disablePortal
      >
        <Stack
          gap="10px"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
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
          <Typography id="modal-delete-account" component="h1">
            Really delete this account?
          </Typography>
          <Typography id="delete-account-confirmation" component="p">
            If you delete your account, you will no longer be able to sign in,
            and all of your data will be deleted. Deleting your account is
            permanent and non-recoverable action.
          </Typography>
          <Stack direction="row" gap="10px" mt="10px" justifyContent="flex-end">
            <Button
              level="tertiary"
              label="Cancel"
              onClick={() => setIsOpen("")}
            />
            <ButtonSpinner
              level="error"
              label="Delete account"
              onClick={handleDeleteAccount}
              isLoading={isLoading}
            />
          </Stack>
        </Stack>
      </Modal>
      <Modal
        aria-labelledby="modal-update-picture"
        aria-describedby="update-profile-picture"
        open={isModalOpen("picture")}
        onClose={closePictureModal}
      >
        <Stack
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
          <Typography id="modal-update-picture" component="h1">
            Upload Image
          </Typography>
          <ImageField
            id="update-profile-picture"
            src={
              file?.delete
                ? ""
                : file?.src
                ? file.src
                : localData?.file
                ? localData.file
                : user?.avatarImage
                ? `data:image/png;base64,${user.avatarImage}`
                : ""
            }
            loading={progress.isLoading && progress.value !== 100}
            onChange={handlePicture}
          />
          {progress.isLoading || progress.value !== 0 || errors["picture"] ? (
            <ProgressUpload
              icon={<ImageIcon />}
              label={file?.name}
              size={file?.size}
              progress={progress.value}
              onClick={removePicture}
              error={errors["picture"]}
            />
          ) : (
            ""
          )}
          <Stack direction="row" mt="20px" gap="10px" justifyContent="flex-end">
            <Button
              level="secondary"
              label="Edit"
              disabled
              sx={{ mr: "auto" }}
            />
            <Button level="tertiary" label="Remove" onClick={removePicture} />
            <Button
              level="primary"
              label="Update"
              onClick={handleUpdatePicture}
              disabled={
                (Object.keys(errors).length !== 0 && errors?.picture) ||
                progress.value !== 100
                  ? true
                  : false
              }
            />
          </Stack>
        </Stack>
      </Modal>
    </TabPanel>
  );
};

ProfilePanel.propTypes = {
  // No props are being passed to this component, hence no specific PropTypes are defined.
};

export default ProfilePanel;
