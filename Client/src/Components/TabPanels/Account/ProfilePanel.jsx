import { useTheme } from "@emotion/react";
import { useRef, useState } from "react";
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
import { formatBytes } from "../../../Utils/fileUtils";

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
    // Disabled for now, will revisit in the future
    // "edit-email": "email",
  };
  const [localData, setLocalData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    // Disabled for now, will revisit in the future
    // email: user.email,
    profileImage: user.profileImage,
  });

  const [errors, setErrors] = useState({});
  const clearError = (err) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (updatedErrors[err]) delete updatedErrors[err];
      return updatedErrors;
    });
  };

  const [isOpen, setIsOpen] = useState("");
  const isModalOpen = (name) => isOpen === name;

  const handleChange = (event) => {
    const { value, id } = event.target;
    const name = idToName[id];
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField({ [name]: value }, editProfileValidation, name);
  };

  const fileRef = useRef();
  const intervalRef = useRef(null);
  const [src, setSrc] = useState();
  const [progress, setProgress] = useState({ value: 0, isLoading: false });
  const handlePicture = (event) => {
    const pic = event.target.files[0];
    let error = validateField(
      { type: pic.type, size: pic.size },
      imageValidation
    );
    if (error) return;

    setProgress((prev) => ({ ...prev, isLoading: true }));
    setSrc(URL.createObjectURL(fileRef.current.files[0]));

    //TODO - potentitally remove once image compression functions are implemented above
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

  const removePicture = () => {
    clearError("picture");
    if (fileRef.current && fileRef.current.files[0]) {
      fileRef.current.value = "";
      URL.revokeObjectURL(fileRef.current?.files[0]);
      setSrc();
    }
    //interrupt interval if image upload is canceled prior to completing the process
    clearInterval(intervalRef.current);
    setProgress({ value: 0, isLoading: false });
  };
  const closePictureModal = () => {
    removePicture();
    setIsOpen("");
  };

  const handleUpdatePicture = () => {
    setProgress({ value: 0, isLoading: false });
    setLocalData((prev) => ({
      ...prev,
      profileImage: fileRef.current?.files[0],
    }));
    setIsOpen("");
  };
  const handleDeletePicture = () => {
    setLocalData((prev) => ({
      ...prev,
      profileImage: null,
    }));
    setSrc(null);
  };

  //TODO - implement delete account function
  const handleDeleteAccount = () => {};
  const handleSaveProfile = (event) => {
    event.preventDefault();
    if (
      localData.firstname === user.firstname &&
      localData.lastname === user.lastname &&
      localData.profileImage === user.profileImage
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
            <Avatar src={src} sx={{ mr: "8px" }} />
            <Button
              level="tertiary"
              label="Delete"
              onClick={handleDeletePicture}
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
            src={src}
            loading={progress.isLoading && progress.value !== 100}
            onChange={handlePicture}
            ref={fileRef}
          />
          {progress.isLoading || progress.value !== 0 || errors["picture"] ? (
            <ProgressUpload
              icon={<ImageIcon />}
              label={fileRef.current?.files[0]?.name}
              size={formatBytes(fileRef.current?.files[0]?.size)}
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
