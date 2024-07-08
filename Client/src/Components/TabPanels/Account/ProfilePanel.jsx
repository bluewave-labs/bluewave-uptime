import { useTheme } from "@emotion/react";
import { useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider, Modal, Stack, Typography } from "@mui/material";
import ButtonSpinner from "../../ButtonSpinner";
import Button from "../../Button";
import EmailTextField from "../../TextFields/Email/EmailTextField";
import StringTextField from "../../TextFields/Text/TextField";
import Avatar from "../../Avatar";
import {
  editProfileValidation,
  imageValidation,
} from "../../../Validation/validation";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../Features/Auth/authSlice";
import ImageField from "../../TextFields/Image";
import ImageIcon from "@mui/icons-material/Image";
import ProgressUpload from "../../ProgressBars";

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

  const { user, authToken, isLoading } = useSelector((state) => state.auth);
  const idToName = {
    "edit-first-name": "firstname",
    "edit-last-name": "lastname",
    //Disabled for now, will revisit in the future
    // "edit-email": "email",
  };
  const [localData, setLocalData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    //Disabled for now, will revisit in the future
    // email: user.email,
    //TODO - upload picture
    profilePicUrl: "placeholder",
  });
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState("");
  const isModalOpen = (name) => isOpen === name;
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { value, id } = event.target;
    const name = idToName[id];
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const validation = editProfileValidation.validate(
      { [name]: value },
      { abortEarly: false }
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

  //TODO - add setPicture state to localData
  const [picture, setPicture] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const handlePicture = (event) => {
    clearError("picture");
    const pic = event.target.files[0];
    console.log(pic);
    //TODO - add setPicture state to localData
    setPicture({ name: pic.name, type: pic.type, size: formatBytes(pic.size) });
    setIsUploading(true);

    const { error } = imageValidation.validate(
      {
        type: pic.type,
        size: pic.size,
      },
      { abortEarly: false }
    );

    if (error) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        updatedErrors["picture"] = error.details[0].message;
        return updatedErrors;
      });
      return;
    }

    setTimeout(() => {
      //TODO - add setPicture state to localData
      setPicture((prev) => ({ ...prev, src: URL.createObjectURL(pic) }));
    }, 1500);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 150);
  };
  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
  };
  const clearError = (err) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (updatedErrors[err]) delete updatedErrors[err];
      return updatedErrors;
    });
  };
  const handleCancelUpload = () => {
    //TODO - add setPicture state to localData
    setPicture();
    setUploadProgress(0);
    setIsUploading(false);
    clearError("picture");
  };
  const handleClosePictureModal = () => {
    setIsOpen("");
    setUploadProgress(0);
    setIsUploading(false);
    clearError("picture");
  };

  //TODO - revisit once localData is set up properly
  const handleDeletePicture = () => {
    setLoading(true);
    setTimeout(() => {
      //TODO - add setPicture state to localData
      setPicture(null);
      setLoading(false);
    }, 2000);
  };
  //TODO - implement update profile function
  const handleUpdatePicture = () => {
    setIsOpen("");
    setUploadProgress(0);
    setIsUploading(false);
  };
  //TODO - implement delete account function
  const handleDeleteAccount = () => {};
  //TODO - implement save profile function
  const handleSaveProfile = (event) => {
    event.preventDefault();
    if (
      localData.firstname === user.firstname &&
      localData.lastname === user.lastname &&
      localData.profilePicUrl === user.profilePicUrl
    ) {
      //TODO - add toast(profile data is unchanged) and maybe disable button
      return;
    }

    dispatch(update({ authToken, localData }));
    //TODO - add toast confirmation
  };

  return (
    <TabPanel value="profile">
      <form className="edit-profile-form" noValidate spellCheck="false">
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography component="h1">First name</Typography>
          </Stack>
          <Stack>
            <StringTextField
              id="edit-first-name"
              label={null}
              value={localData.firstname}
              placeholder="Enter your first name"
              autoComplete="given-name"
              onChange={handleChange}
              error={errors[idToName["edit-first-name"]] ? true : false}
            />
            {errors[idToName["edit-first-name"]] ? (
              <Typography component="p" className="input-error">
                {errors[idToName["edit-first-name"]]}
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </div>
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography component="h1">Last name</Typography>
          </Stack>
          <Stack>
            <StringTextField
              id="edit-last-name"
              label={null}
              value={localData.lastname}
              placeholder="Enter your last name"
              autoComplete="family-name"
              onChange={handleChange}
              error={errors[idToName["edit-last-name"]] ? true : false}
            />
            {errors[idToName["edit-last-name"]] ? (
              <Typography component="p" className="input-error">
                {errors[idToName["edit-last-name"]]}
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </div>
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography component="h1">Email</Typography>
            <Typography component="p">
              This is your current email address — it cannot be changed.
            </Typography>
          </Stack>
          <Stack>
            <EmailTextField
              id="edit-email"
              label={null}
              value={user.email}
              placeholder="Enter your email"
              autoComplete="email"
              // onChange={handleChange}
              // error={errors[idToName["edit-email"]] ? true : false}
              disabled={true}
            />
            {errors[idToName["edit-email"]] ? (
              <Typography component="p" className="input-error">
                {errors[idToName["edit-email"]]}
              </Typography>
            ) : (
              ""
            )}
          </Stack>
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
              src={picture ? picture.src : "/static/images/avatar/2.jpg"}
              firstName={user?.firstname}
              lastName={user?.lastname}
              sx={{
                width: "64px",
                height: "64px",
                border: "none",
                mr: "8px",
              }}
            />
            <ButtonSpinner
              level="tertiary"
              label="Delete"
              onClick={handleDeletePicture}
              isLoading={loading}
            />
            <Button
              level="tertiary"
              label="Update"
              onClick={() => setIsOpen("picture")}
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
              disabled={Object.keys(errors).length !== 0 && true}
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
        onClose={handleClosePictureModal}
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
            picture={picture?.src}
            onChange={handlePicture}
          />
          {isUploading ? (
            <ProgressUpload
              icon={<ImageIcon />}
              label={picture?.name}
              size={picture?.size}
              progress={uploadProgress}
              onClick={handleCancelUpload}
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
            <ButtonSpinner
              level="tertiary"
              label="Remove"
              onClick={handleCancelUpload}
              isLoading={loading}
            />
            <ButtonSpinner
              level="primary"
              label="Update"
              onClick={handleUpdatePicture}
              isLoading={isLoading}
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
