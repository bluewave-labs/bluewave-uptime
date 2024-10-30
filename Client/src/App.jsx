import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import "./App.css";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register/Register";
import HomeLayout from "./Layouts/HomeLayout";
import Account from "./Pages/Account";
import Monitors from "./Pages/Monitors/Home";
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
import AdvancedSettings from "./Pages/AdvancedSettings";
import Maintenance from "./Pages/Maintenance";
import withAdminCheck from "./HOC/withAdminCheck";
import withAdminProp from "./HOC/withAdminProp";
import Configure from "./Pages/Monitors/Configure";
import PageSpeed from "./Pages/PageSpeed";
import CreatePageSpeed from "./Pages/PageSpeed/CreatePageSpeed";
import CreateNewMaintenanceWindow from "./Pages/Maintenance/CreateMaintenance";
import PageSpeedDetails from "./Pages/PageSpeed/Details";
import PageSpeedConfigure from "./Pages/PageSpeed/Configure";
import { ThemeProvider } from "@emotion/react";
import lightTheme from "./Utils/Theme/lightTheme";
import darkTheme from "./Utils/Theme/darkTheme";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAppSettings, updateAppSettings } from "./Features/Settings/settingsSlice";
import { logger } from "./Utils/Logger"; // Import the logger
import { networkService } from "./main";
function App() {
	const AdminCheckedRegister = withAdminCheck(Register);
	const MonitorsWithAdminProp = withAdminProp(Monitors);
	const MonitorDetailsWithAdminProp = withAdminProp(Details);
	const PageSpeedWithAdminProp = withAdminProp(PageSpeed);
	const PageSpeedDetailsWithAdminProp = withAdminProp(PageSpeedDetails);
	const MaintenanceWithAdminProp = withAdminProp(Maintenance);
	const SettingsWithAdminProp = withAdminProp(Settings);
	const AdvancedSettingsWithAdminProp = withAdminProp(AdvancedSettings);
	const mode = useSelector((state) => state.ui.mode);
	const { authToken } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (authToken) {
			dispatch(getAppSettings({ authToken }));
		}
	}, [dispatch, authToken]);

	// Cleanup
	useEffect(() => {
		return () => {
			logger.cleanup();
			networkService.cleanup();
		};
	}, []);

	return (
		<ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
			<CssBaseline />
			<Routes>
				<Route
					exact
					path="/"
					element={<HomeLayout />}
				>
					<Route
						exact
						path="/"
						element={<ProtectedRoute Component={MonitorsWithAdminProp} />}
					/>
					<Route
						path="/monitors"
						element={<ProtectedRoute Component={MonitorsWithAdminProp} />}
					/>
					<Route
						path="/monitors/create/:monitorId?"
						element={<ProtectedRoute Component={CreateMonitor} />}
					/>
					<Route
						path="/monitors/:monitorId/"
						element={<ProtectedRoute Component={MonitorDetailsWithAdminProp} />}
					/>
					<Route
						path="/monitors/configure/:monitorId/"
						element={<ProtectedRoute Component={Configure} />}
					/>
					<Route
						path="incidents/:monitorId?"
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
						element={<ProtectedRoute Component={MaintenanceWithAdminProp} />}
					/>
					<Route
						path="/maintenance/create/:maintenanceWindowId?"
						element={<CreateNewMaintenanceWindow />}
					/>
					<Route
						path="settings"
						element={<ProtectedRoute Component={SettingsWithAdminProp} />}
					/>
					<Route
						path="advanced-settings"
						element={<ProtectedRoute Component={AdvancedSettingsWithAdminProp} />}
					/>
					<Route
						path="account/profile"
						element={
							<ProtectedRoute
								Component={Account}
								open="profile"
							/>
						}
					/>
					<Route
						path="account/password"
						element={
							<ProtectedRoute
								Component={Account}
								open="password"
							/>
						}
					/>
					<Route
						path="account/team"
						element={
							<ProtectedRoute
								Component={Account}
								open="team"
							/>
						}
					/>
					<Route
						path="pagespeed"
						element={<ProtectedRoute Component={PageSpeedWithAdminProp} />}
					/>
					<Route
						path="pagespeed/create"
						element={<ProtectedRoute Component={CreatePageSpeed} />}
					/>
					<Route
						path="pagespeed/:monitorId"
						element={<ProtectedRoute Component={PageSpeedDetailsWithAdminProp} />}
					/>
					<Route
						path="pagespeed/configure/:monitorId"
						element={<ProtectedRoute Component={PageSpeedConfigure} />}
					/>
				</Route>

				<Route
					exact
					path="/login"
					element={<Login />}
				/>

				<Route
					exact
					path="/register"
					element={<AdminCheckedRegister />}
				/>
				<Route
					exact
					path="/register/:token"
					element={<Register />}
				/>
				{/* <Route path="/toast" element={<ToastComponent />} /> */}
				<Route
					path="*"
					element={<NotFound />}
				/>
				<Route
					path="/forgot-password"
					element={<ForgotPassword />}
				/>
				<Route
					path="/check-email"
					element={<CheckEmail />}
				/>
				<Route
					path="/set-new-password/:token"
					element={<SetNewPassword />}
				/>
				<Route
					path="/new-password-confirmed"
					element={<NewPasswordConfirmed />}
				/>
			</Routes>
			<ToastContainer />
		</ThemeProvider>
	);
}

export default App;
