import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { formatDate, formatDurationRounded } from "../../Utils/timeUtils";
import { StatusLabel } from "../../Components/Label";
import { useDispatch, useSelector } from "react-redux";
import { getPageSpeedByTeamId } from "../../Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import PageSpeedIcon from "../../assets/icons/page-speed.svg?react";
import Fallback from "../../Components/Fallback";
import "./index.css";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";
import { getLastChecked } from "../../Utils/monitorUtils";
import PropTypes from "prop-types";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Greeting from "../../Utils/greeting";

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
              color={theme.palette.common.main}
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

/**
 * Renders a skeleton layout.
 *
 * @returns {JSX.Element}
 */
const SkeletonLayout = () => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(2)}>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={theme.spacing(12)}
      >
        <Box width="80%">
          <Skeleton variant="rounded" width="25%" height={24} />
          <Skeleton
            variant="rounded"
            width="50%"
            height={19.5}
            sx={{ mt: theme.spacing(2) }}
          />
        </Box>
        <Skeleton
          variant="rounded"
          width="20%"
          height={34}
          sx={{ alignSelf: "flex-end" }}
        />
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={theme.spacing(12)}>
        <Skeleton
          variant="rounded"
          width="100%"
          height={120}
          sx={{ flex: "35%" }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={120}
          sx={{ flex: "35%" }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={120}
          sx={{ flex: "35%" }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={120}
          sx={{ flex: "35%" }}
        />
      </Stack>
    </Stack>
  );
};

const PageSpeed = ({ isAdmin }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authToken, user } = useSelector((state) => state.auth);
  const { monitors, isLoading } = useSelector(
    (state) => state.pageSpeedMonitors
  );
  useEffect(() => {
    dispatch(getPageSpeedByTeamId(authToken));
  }, [authToken, dispatch]);

  // will show skeletons only on initial load
  // since monitor state is being added to redux persist, there's no reason to display skeletons on every render
  let isActuallyLoading = isLoading && monitors.length === 0;

  return (
    <Box
      className="page-speed"
      sx={{
        ':has(> [class*="fallback__"])': {
          position: "relative",
          border: 1,
          borderColor: theme.palette.border.light,
          borderRadius: theme.shape.borderRadius,
          borderStyle: "dashed",
          backgroundColor: theme.palette.background.main,
          overflow: "hidden",
        },
      }}
    >
      {isActuallyLoading ? (
        <SkeletonLayout />
      ) : monitors?.length !== 0 ? (
        <Box
          sx={{
            "& p": {
              color: theme.palette.text.secondary,
            },
          }}
        >
          <Box mb={theme.spacing(12)}>
            <Breadcrumbs list={[{ name: `pagespeed`, path: "/pagespeed" }]} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={theme.spacing(5)}
            >
              <Greeting type="pagespeed" />
              <Button
                level="primary"
                label="Create new"
                onClick={() => navigate("/pagespeed/create")}
              />
            </Stack>
          </Box>
          <Grid container spacing={theme.spacing(12)}>
            {monitors?.map((monitor) => (
              <Card data={monitor} key={`monitor-${monitor._id}`} />
            ))}
          </Grid>
        </Box>
      ) : (
        <Fallback
          title="pagespeed monitor"
          checks={[
            "Report on the user experience of a page",
            "Help analyze webpage speed",
            "Give suggestions on how the page can be improved",
          ]}
          link="/pagespeed/create"
          isAdmin={isAdmin}
        />
      )}
    </Box>
  );
};
PageSpeed.propTypes = {
  isAdmin: PropTypes.bool,
};

export default PageSpeed;
