import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router";
import DashboardSidebar from "../../Components/DashboardSidebar";
import "./index.css";

// Demo, remove me
import { useSelector } from "react-redux";
// Emd Demo

const HomeLayout = () => {
  const authState = useSelector((state) => state.auth);
  const { user, msg } = authState;
  return (
    <div className="home-layout">
      <NavBar />
      <div className="main-content">
        <DashboardSidebar />
        {/* Remove me later */}
        {user && <p>{user.firstname}</p>}
        {user && <p>{user.lastname}</p>}
        {user && <p>{user.email}</p>}
        {msg && <p>Msg: {msg}</p>}
        {/* I am a demo */}
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
