import { useTheme } from "@emotion/react";
import { useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import {
  Avatar,
  Box,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ButtonSpinner from "../../ButtonSpinner";
import Button from "../../Button";

/**
 * ProfilePanel component displays a form for editing user profile information
 * and allows for actions like updating profile picture, credentials,
 * and deleting account.
 *
 * @returns {JSX.Element}
 */

const ProfilePanel = () => {
  const theme = useTheme();
  //TODO - use redux loading state
  //!! - currently all loading buttons are tied to the same state
  const [isLoading, setIsLoading] = useState(false);
  //TODO - implement delete profile picture function
  const handleDeletePicture = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  //TODO - implement update profile function
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
  //TODO - implement save profile function
  const handleSaveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <TabPanel value="0">
      <form className="edit-profile-form" noValidate spellCheck="false">
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              First Name
            </Typography>
          </Stack>
          {/* TODO - use existing textfield components */}
          <TextField
            id="edit-first-name"
            placeholder="Enter your first name"
            sx={{
              flex: 1,
            }}
          />
        </div>
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              Last Name
            </Typography>
          </Stack>
          {/* TODO - use existing textfield components */}
          <TextField
            id="edit-last-name"
            placeholder="Enter your last name"
            sx={{
              flex: 1,
            }}
          />
        </div>
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              Email
            </Typography>
            <Typography variant="h5" component="p">
              After updating, you'll receive a confirmation email.
            </Typography>
          </Stack>
          {/* TODO - use existing textfield components */}
          <TextField
            id="edit-email"
            placeholder="Enter your email"
            sx={{
              flex: 1,
            }}
          />
        </div>
        <div className="edit-profile-form__wrapper">
          <Stack>
            <Typography variant="h4" component="h1">
              Your Photo
            </Typography>
            <Typography variant="h5" component="p">
              This photo will be displayed in your profile page.
            </Typography>
          </Stack>
          <Stack className="row-stack" direction="row" alignItems="center">
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
            />
            {/* TODO - modal popup for update pfp? */}
            <Button
              level="tertiary"
              label="Update"
              onClick={handleUpdatePicture}
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
            <Typography variant="h4" component="h1">
              Delete account
            </Typography>
            <Typography variant="h5" component="p">
              Note that deleting your account will remove all data from our
              system. This is permanent and non-recoverable.
            </Typography>
            <Box sx={{ mt: theme.spacing(1) }}>
              <Button
                level="error"
                label="Delete account"
                onClick={() => setIsOpen(true)}
              />
            </Box>
          </Stack>
        </div>
      </form>
      {/* TODO - Update ModalPopup Component with @mui for reusability */}
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
            borderRadius: `${theme.shape.borderRadius}px`,
            boxShadow: 24,
            p: "30px",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography id="modal-delete-account" variant="h4" component="h1">
            Really delete this account?
          </Typography>
          <Typography
            id="delete-account-confirmation"
            variant="h5"
            component="p"
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
    </TabPanel>
  );
};

ProfilePanel.propTypes = {
  // No props are being passed to this component, hence no specific PropTypes are defined.
};

export default ProfilePanel;
