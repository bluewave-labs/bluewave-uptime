import { getLastChecked } from "../../Utils/monitorUtils";
import { formatDate, formatDurationRounded } from "../../Utils/timeUtils";
import PageSpeedIcon from "../../assets/icons/page-speed.svg?react";
import { StatusLabel } from "../../Components/Label";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

const Card = ({ data }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid
      item
      lg={6}
      flexGrow={1}
      sx={{
        "&:hover > .MuiStack-root": {
          backgroundColor: theme.palette.background.accent,
        },
      }}
    >
      <Stack
        direction="row"
        gap={theme.spacing(6)}
        p={theme.spacing(8)}
        onClick={() => navigate(`/pagespeed/${data._id}`)}
        border={1}
        borderColor={theme.palette.border.light}
        borderRadius={theme.shape.borderRadius}
        backgroundColor={theme.palette.background.main}
        sx={{
          cursor: "pointer",
          "& svg path": { stroke: theme.palette.other.icon, strokeWidth: 0.8 },
        }}
      >
        <PageSpeedIcon
          style={{ width: theme.spacing(8), height: theme.spacing(8) }}
        />
        <Box flex={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              component="h2"
              mb={theme.spacing(2)}
              color={theme.palette.primary.main}
            >
              {data.name}
            </Typography>
            <StatusLabel
              status={data.status ? "up" : "cannot resolve"}
              text={data.status ? "Live (collecting data)" : "Inactive"}
            />
          </Stack>
          <Typography fontSize={13}>
            {data.url.replace(/^https?:\/\//, "")}
          </Typography>
          <Typography mt={theme.spacing(12)}>
            <Typography component="span" fontWeight={600}>
              Last checked:{" "}
            </Typography>
            {formatDate(getLastChecked(data.checks, false))}{" "}
            <Typography component="span" fontStyle="italic">
              ({formatDurationRounded(getLastChecked(data.checks))} ago)
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </Grid>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Card;
