import { Navigate, Route, Routes as LibRoutes } from "react-router";
import HomeLayout from "../Components/Layouts/HomeLayout";
import { Infrastructure } from "../Pages/Infrastructure";
import InfrastructureDetails from "../Pages/Infrastructure/Details";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register/Register";
import Account from "../Pages/Account";
import Monitors from "../Pages/Monitors/Home";
import CreateMonitor from "../Pages/Monitors/CreateMonitor";
import CreateInfrastructureMonitor from "../Pages/Infrastructure/CreateMonitor";
import Incidents from "../Pages/Incidents";
import Status from "../Pages/Status";
import Integrations from "../Pages/Integrations";
import Settings from "../Pages/Settings";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import CheckEmail from "../Pages/Auth/CheckEmail";
import SetNewPassword from "../Pages/Auth/SetNewPassword";
import NewPasswordConfirmed from "../Pages/Auth/NewPasswordConfirmed";
import ProtectedRoute from "../Components/ProtectedRoute";
import Details from "../Pages/Monitors/Details";
import AdvancedSettings from "../Pages/AdvancedSettings";
import Maintenance from "../Pages/Maintenance";
import Configure from "../Pages/Monitors/Configure";
import PageSpeed from "../Pages/PageSpeed";
import CreatePageSpeed from "../Pages/PageSpeed/CreatePageSpeed";
import CreateNewMaintenanceWindow from "../Pages/Maintenance/CreateMaintenance";
import PageSpeedDetails from "../Pages/PageSpeed/Details";
import PageSpeedConfigure from "../Pages/PageSpeed/Configure";
import withAdminCheck from "../Components/HOC/withAdminCheck";
import withAdminProp from "../Components/HOC/withAdminProp";

const Routes = () => {
	const AdminCheckedRegister = withAdminCheck(Register);
	const MonitorsWithAdminProp = withAdminProp(Monitors);
	const MonitorDetailsWithAdminProp = withAdminProp(Details);
	const PageSpeedWithAdminProp = withAdminProp(PageSpeed);
	const PageSpeedDetailsWithAdminProp = withAdminProp(PageSpeedDetails);
	const MaintenanceWithAdminProp = withAdminProp(Maintenance);
	const SettingsWithAdminProp = withAdminProp(Settings);
	const AdvancedSettingsWithAdminProp = withAdminProp(AdvancedSettings);
	const InfrastructureDetailsWithAdminProp = withAdminProp(InfrastructureDetails);
	return (
		<LibRoutes>
			<Route
				path="/"
				element={<ProtectedRoute Component={HomeLayout} />}
			>
				<Route
					path="/"
					element={<Navigate to="/monitors" />}
				/>
				<Route
					path="/monitors"
					element={<MonitorsWithAdminProp />}
				/>
				<Route
					path="/monitors/create/:monitorId?"
					element={<CreateMonitor />}
				/>
				<Route
					path="/monitors/:monitorId/"
					element={<MonitorDetailsWithAdminProp />}
				/>
				<Route
					path="/monitors/configure/:monitorId/"
					element={<Configure />}
				/>
				<Route
					path="pagespeed"
					element={<PageSpeedWithAdminProp />}
				/>
				<Route
					path="pagespeed/create"
					element={<CreatePageSpeed />}
				/>
				<Route
					path="pagespeed/:monitorId"
					element={<PageSpeedDetailsWithAdminProp />}
				/>
				<Route
					path="pagespeed/configure/:monitorId"
					element={<PageSpeedConfigure />}
				/>
				<Route
					path="infrastructure"
					element={<Infrastructure />}
				/>
				<Route
					path="infrastructure/create"
					element={<CreateInfrastructureMonitor />}
				/>
				<Route
					path="infrastructure/:monitorId"
					element={<InfrastructureDetailsWithAdminProp />}
				/>

				<Route
					path="incidents/:monitorId?"
					element={<Incidents />}
				/>

				<Route
					path="status"
					element={<Status />}
				/>
				<Route
					path="integrations"
					element={<Integrations />}
				/>
				<Route
					path="maintenance"
					element={<MaintenanceWithAdminProp />}
				/>
				<Route
					path="/maintenance/create/:maintenanceWindowId?"
					element={<CreateNewMaintenanceWindow />}
				/>
				<Route
					path="settings"
					element={<SettingsWithAdminProp />}
				/>
				<Route
					path="advanced-settings"
					element={<AdvancedSettingsWithAdminProp />}
				/>
				<Route
					path="account/profile"
					element={<Account open={"profile"} />}
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
			</Route>

			<Route
				path="/login"
				element={<Login />}
			/>

			<Route
				path="/register"
				element={<AdminCheckedRegister />}
			/>

			<Route
				exact
				path="/register/:token"
				element={<Register />}
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

			<Route
				path="*"
				element={<NotFound />}
			/>
		</LibRoutes>
	);
};

export { Routes };

/* import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter({
  {
    path: "/",
  }
});

export { router }; */
