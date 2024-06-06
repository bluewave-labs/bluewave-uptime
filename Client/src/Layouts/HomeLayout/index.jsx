import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router";
import DashboardSidebar from "../../Components/DashboardSidebar";
import "./index.css";

const HomeLayout = () => {
  return (
    <div className="home-layout">
      <DashboardSidebar />
      <div className="main-content">
        <NavBar />
      </div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
