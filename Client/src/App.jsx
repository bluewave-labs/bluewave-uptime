import { Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomeLayout from "./Layouts/HomeLayout";
import Demo from "./Pages/Demo/Demo";
import PlayGround from "./Pages/PlayGround/PlayGround";
import Account from "./Pages/Account";
import Monitors from "./Pages/Monitors";
import CreateNewMonitor from "./Pages/CreateNewMonitor";
import Incidents from "./Pages/Incidents";
import Status from "./Pages/Status";
import Integrations from "./Pages/Integrations";
import Settings from "./Pages/Settings";
import ForgotPassword from "./Pages/ForgotPassword";
import CheckEmail from "./Pages/CheckEmail";
import SetNewPassword from "./Pages/SetNewPassword";
import NewPasswordConfirmed from "./Pages/NewPasswordConfirmed";
import ProtectedRoute from "./Components/ProtectedRoute";
import Details from "./Pages/Details";
import Maintenance from "./Pages/Maintenance";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
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
            element={<ProtectedRoute Component={CreateNewMonitor} />}
          />
          <Route
            path="/monitors/:monitorId/"
            element={<ProtectedRoute Component={Details} />}
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
        </Route>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/demo" element={<Demo />} />
        {/* <Route path="/toast" element={<ToastComponent />} /> */}
        <Route path="*" element={<NotFound />} />
        <Route path="/playground" element={<PlayGround />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/set-new-password/:token" element={<SetNewPassword />} />
        <Route
          path="/new-password-confirmed"
          element={<NewPasswordConfirmed />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
