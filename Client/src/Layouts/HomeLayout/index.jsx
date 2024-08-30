import Sidebar from "../../Components/Sidebar";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

import "./index.css";

const HomeLayout = () => {
  const theme = useTheme();

  return (
    <Box backgroundColor={theme.palette.background.alt}>
      <Box className="home-layout">
        <Sidebar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeLayout;
