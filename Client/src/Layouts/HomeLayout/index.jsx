import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router";
import DashboardSidebar from "../../Components/DashboardSidebar";
import "./index.css";

// Demo, remove me
import { jwtDecode } from "jwt-decode";
// Emd Demo

const HomeLayout = () => {
  const token = localStorage.getItem("token");
  const decodedToken = token && jwtDecode(token);
  return (
    <div className="home-layout">
      <DashboardSidebar />
      <div className="main-content">
        <NavBar />
        {/* Remove me later */}
        {token && <p>You are logged in</p>}
        {token && <p>First Name: {decodedToken.firstname}</p>}
        {token && <p>Last Name: {decodedToken.lastname}</p>}
        {token && <p>Email: {decodedToken.email}</p>}
        {/* I am a demo */}
      </div>
    </div>
  );
};

export default HomeLayout;
