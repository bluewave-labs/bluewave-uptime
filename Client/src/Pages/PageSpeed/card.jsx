import PageSpeedIcon from "../../assets/icons/page-speed.svg?react";
import { StatusLabel } from "../../Components/Label";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { formatDate, formatDurationRounded } from "../../Utils/timeUtils";
import { getLastChecked } from "../../Utils/monitorUtils";
import useUtils from "../Monitors/utils";
import PropTypes from "prop-types";
import { IconBox } from "./Details/styled";

const Card = ({ monitor }) => {
  const { determineState, pagespeedStatusMsg } = useUtils();
  const theme = useTheme();
  const navigate = useNavigate();
  const monitorState = determineState(monitor);
  return (
    <Grid item lg={6} flexGrow={1}>
      <Box
        p={theme.spacing(8)}
        onClick={() => navigate(`/pagespeed/${monitor._id}`)}
        border={1}
        borderColor={theme.palette.border.light}
        borderRadius={theme.shape.borderRadius}
        backgroundColor={theme.palette.background.main}
        sx={{
          display: "grid",
          gridTemplateColumns: "34px 2fr 1fr",
          columnGap: theme.spacing(5),
          gridTemplateRows: "34px 1fr 3fr",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.background.accent,
          },
        }}
      >
        <IconBox>
          <PageSpeedIcon />
        </IconBox>
        <Typography component="h2" variant="h2" alignSelf="center">
          {monitor.name}
        </Typography>
        <StatusLabel
          status={monitorState}
          text={pagespeedStatusMsg[monitorState] || "Pending..."}
          customStyles={{
            width: "max-content",
            textTransform: "capitalize",
            alignSelf: "flex-start",
            justifySelf: "flex-end",
          }}
        />
        <Typography
          variant="body2"
          mt={theme.spacing(-1)}
          sx={{ gridColumnStart: 2 }}
        >
          {monitor.url}
        </Typography>
      </Box>
    </Grid>
  );
};

Card.propTypes = {
  monitor: PropTypes.object.isRequired,
};

export default Card;
