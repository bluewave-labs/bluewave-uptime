import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Button from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Fallback = ({ isAdmin }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Stack
      alignItems="center"
      backgroundColor={theme.palette.otherColors.white}
      p={theme.gap.xxl}
      gap={theme.gap.xs}
      border={1}
      borderRadius={`${theme.shape.borderRadius}px`}
      borderColor={theme.palette.otherColors.graishWhite}
    >
      <Typography component="h2">No monitors found</Typography>
      <Typography>
        It looks like you don’t have any monitors set up yet.
      </Typography>
      {isAdmin && (
        <Button
          level="primary"
          label="Create your first monitor"
          onClick={() => {
            navigate("/monitors/create");
          }}
          sx={{ mt: theme.gap.large }}
        />
      )}
    </Stack>
  );
};

Fallback.propTypes = {
  isAdmin: PropTypes.bool,
};

export default Fallback;
