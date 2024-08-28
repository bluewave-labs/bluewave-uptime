import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { formatDate, formatDurationRounded } from "../../Utils/timeUtils";
import { StatusLabel } from "../../Components/Label";
import { useDispatch, useSelector } from "react-redux";
import { getPageSpeedByUserId } from "../../Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import PageSpeedIcon from "../../assets/icons/page-speed.svg?react";
import Fallback from "../../Components/Fallback";
import "./index.css";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";
import { getLastChecked } from "../../Utils/monitorUtils";
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
          backgroundColor: "var(--primary-bg-accent)",
        },
      }}
    >
      <Stack
        direction="row"
        gap={theme.gap.medium}
        p={theme.gap.ml}
        onClick={() => navigate(`/pagespeed/${data._id}`)}
        sx={{ cursor: "pointer" }}
      >
        <PageSpeedIcon style={{ width: theme.gap.ml, height: theme.gap.ml }} />
        <Box flex={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography component="h2" mb={theme.gap.xs}>
              {data.name}
            </Typography>
            <StatusLabel
              status={data.status ? "up" : "cannot resolve"}
              text={data.status ? "Live (collecting data)" : "Inactive"}
            />
          </Stack>
          <Typography>{data.url.replace(/^https?:\/\//, "")}</Typography>
          <Typography mt={theme.gap.large}>
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
    <Stack gap={theme.gap.xs}>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={theme.gap.large}
      >
        <Box width="80%">
          <Skeleton variant="rounded" width="25%" height={24} />
          <Skeleton
            variant="rounded"
            width="50%"
            height={19.5}
            sx={{ mt: theme.gap.xs }}
          />
        </Box>
        <Skeleton
          variant="rounded"
          width="20%"
          height={34}
          sx={{ alignSelf: "flex-end" }}
        />
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={theme.gap.large}>
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

const PageSpeed = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authToken } = useSelector((state) => state.auth);
  const { monitors, isLoading } = useSelector(
    (state) => state.pageSpeedMonitors
  );
  useEffect(() => {
    dispatch(getPageSpeedByUserId(authToken));
  }, [authToken, dispatch]);

  // will show skeletons only on initial load
  // since monitor state is being added to redux persist, there's no reason to display skeletons on every render
  let isActuallyLoading = isLoading && monitors.length === 0;

  return (
    <Box
      className="page-speed"
      pt={theme.gap.xl}
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
        <Stack gap={theme.gap.xs}>
          <Stack
            direction="row"
            justifyContent="space-between"
            mb={theme.gap.large}
          >
            <Box>
              <Typography component="h1">All page speed monitors</Typography>
              <Typography mt={theme.gap.xs}>
                Click on one of the monitors to get more site speed information.
              </Typography>
            </Box>
            <Button
              level="primary"
              label="Create new"
              onClick={() => navigate("/pagespeed/create")}
            />
          </Stack>
          <Grid container spacing={theme.gap.large}>
            {monitors?.map((monitor) => (
              <Card data={monitor} key={`monitor-${monitor._id}`} />
            ))}
          </Grid>
        </Stack>
      ) : (
        <Fallback
          title="page speed"
          checks={[
            "Report on the user experience of a page",
            "Help analyze webpage speed",
            "Give suggestions on how the page can be improved",
          ]}
          link="/pagespeed/create"
        />
      )}
    </Box>
  );
};

export default PageSpeed;
