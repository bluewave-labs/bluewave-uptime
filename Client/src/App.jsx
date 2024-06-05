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

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomeLayout />}>
          <Route path="monitors" element={<Monitors />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="status" element={<Status />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/playground" element={<PlayGround />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route
          path="/new-password-confirmed"
          element={<NewPasswordConfirmed />}
        />
      </Routes>
    </>
  );
}

export default App;
