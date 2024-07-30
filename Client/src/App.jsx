import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import "./App.css";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register/Register";
import HomeLayout from "./Layouts/HomeLayout";
import Account from "./Pages/Account";
import Monitors from "./Pages/Monitors";
import CreateMonitor from "./Pages/Monitors/CreateMonitor";
import Incidents from "./Pages/Incidents";
import Status from "./Pages/Status";
import Integrations from "./Pages/Integrations";
import Settings from "./Pages/Settings";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import CheckEmail from "./Pages/Auth/CheckEmail";
import SetNewPassword from "./Pages/Auth/SetNewPassword";
import NewPasswordConfirmed from "./Pages/Auth/NewPasswordConfirmed";
import ProtectedRoute from "./Components/ProtectedRoute";
import Details from "./Pages/Monitors/Details";
import Maintenance from "./Pages/Maintenance";
import withAdminCheck from "./HOC/withAdminCheck";
import Configure from "./Pages/Monitors/Configure";
import PageSpeed from "./Pages/PageSpeed";
import CreatePageSpeed from "./Pages/PageSpeed/CreatePageSpeed";
import MaintenanceOptions from "./Components/MaintenanceOptions";

function App() {
  const AdminCheckedRegister = withAdminCheck(Register);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomeLayout />}>
          <Route
            exact
            path="/"
            element={<ProtectedRoute Component={Monitors} />}
          />
          <Route
            path="/monitors"
            element={<ProtectedRoute Component={Monitors} />}
          />
          <Route
            path="/monitors/create"
            element={<ProtectedRoute Component={CreateMonitor} />}
          />
          <Route
            path="/monitors/:monitorId/"
            element={<ProtectedRoute Component={Details} />}
          />
          <Route
            path="/monitors/configure/:monitorId/"
            element={<ProtectedRoute Component={Configure} />}
          />
          <Route
            path="incidents"
            element={<ProtectedRoute Component={Incidents} />}
          />

          <Route
            path="status"
            element={<ProtectedRoute Component={Status} />}
          />
          <Route
            path="integrations"
            element={<ProtectedRoute Component={Integrations} />}
          />
          <Route
            path="maintenance"
            element={<ProtectedRoute Component={Maintenance} />}
          />
          <Route
            path="settings"
            element={<ProtectedRoute Component={Settings} />}
          />
          <Route
            path="account/profile"
            element={<ProtectedRoute Component={Account} open="profile" />}
          />
          <Route
            path="account/password"
            element={<ProtectedRoute Component={Account} open="password" />}
          />
          <Route
            path="account/team"
            element={<ProtectedRoute Component={Account} open="team" />}
          />
          <Route
            path="page-speed"
            element={<ProtectedRoute Component={PageSpeed} />}
          />
          <Route
            path="page-speed/create"
            element={<ProtectedRoute Component={CreatePageSpeed} />}
          />
        </Route>

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/register" element={<AdminCheckedRegister />} />
        <Route exact path="/register/:token" element={<Register />} />
        {/* <Route path="/toast" element={<ToastComponent />} /> */}
        <Route path="*" element={<NotFound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/set-new-password/:token" element={<SetNewPassword />} />
        <Route
          path="/new-password-confirmed"
          element={<NewPasswordConfirmed />}
        />
        <Route path="/maintainopts" element={<MaintenanceOptions />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
