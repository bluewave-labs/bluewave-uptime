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
  console.log(user, msg);
  return (
    <div className="home-layout">
      <DashboardSidebar />
      <div className="main-content">
        <NavBar />
        {/* Remove me later */}
        {user && <p>{user.firstname}</p>}
        {user && <p>{user.lastname}</p>}
        {user && <p>{user.email}</p>}
        {msg && <p>Msg: {msg}</p>}
        {/* I am a demo */}
      </div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
