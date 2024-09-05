import { Box, Button, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { getPageSpeedByTeamId } from "../../Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import Fallback from "../../Components/Fallback";
import "./index.css";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Greeting from "../../Utils/greeting";
import SkeletonLayout from "./skeleton";
import Card from "./card";

const PageSpeed = ({ isAdmin }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authToken } = useSelector((state) => state.auth);
  const { monitors, isLoading } = useSelector(
    (state) => state.pageSpeedMonitors
  );
  useEffect(() => {
    dispatch(getPageSpeedByTeamId(authToken));
  }, [authToken, dispatch]);

  // will show skeletons only on initial load
  // since monitor state is being added to redux persist, there's no reason to display skeletons on every render
  let isActuallyLoading = isLoading && monitors?.monitors.length === 0;

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
      ) : monitors?.monitors?.length !== 0 ? (
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
                variant="contained"
                color="primary"
                onClick={() => navigate("/pagespeed/create")}
              >
                Create new
              </Button>
            </Stack>
          </Box>
          <Grid container spacing={theme.spacing(12)}>
            {monitors?.monitors?.map((monitor) => (
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
