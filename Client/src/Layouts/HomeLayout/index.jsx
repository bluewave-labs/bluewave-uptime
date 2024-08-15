import Sidebar from "../../Components/Sidebar";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

import "./index.css";

const HomeLayout = () => {
  return (
    <Box className="home-layout">
      <Sidebar />
      <Outlet />
    </Box>
  );
};

export default HomeLayout;
