import { Routes, Route } from "react-router-dom";
// import "./App.css";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomeLayout from "./Layouts/HomeLayout";
import Demo from "./Pages/Demo/Demo";
import PlayGround from "./Pages/PlayGround/PlayGround";
import Monitors from "./Pages/Monitors";
import Incidents from "./Pages/Incidents";
import Status from "./Pages/Status";
import Integrations from "./Pages/Integrations";
import Settings from "./Pages/Settings";
import ForgotPassword from "./Pages/ForgotPassword";
import CheckEmail from "./Pages/CheckEmail";
import SetNewPassword from "./Pages/SetNewPassword";
import NewPasswordConfirmed from "./Pages/NewPasswordConfirmed";
import ToastComponent from "./Components/Toast";
import ProtectedRoute from "./Components/ProtectedRoute";

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
            path="settings"
            element={<ProtectedRoute Component={Settings} />}
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
    </>
  );
}

export default App;
