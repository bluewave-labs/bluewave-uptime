import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router";
import DashboardSidebar from "../../Components/Dashboard/DashboardSidebar";
import "./index.css";

const HomeLayout = () => {
  return (
    <div className="home-layout">
      <NavBar />
      <div className="main-content">
        <DashboardSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
