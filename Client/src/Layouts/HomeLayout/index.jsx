import Sidebar from "../../Components/Sidebar";
import { Outlet } from "react-router";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

import "./index.css";

const HomeLayout = () => {
  const theme = useTheme();

  return (
    <Box backgroundColor={theme.palette.background.alt}>
      <Stack
        className="home-layout"
        flexDirection="row"
        gap={theme.spacing(14)}
      >
        <Sidebar />
        <Outlet />
      </Stack>
    </Box>
  );
};

export default HomeLayout;
