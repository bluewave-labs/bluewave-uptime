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
				element={<HomeLayout />}
			>
				<Route
					path="/"
					element={<Navigate to="/monitors" />}
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
				<Route
					path="infrastructure"
					element={<ProtectedRoute Component={Infrastructure} />}
				/>
				<Route
					path="infrastructure/create"
					element={<ProtectedRoute Component={CreateInfrastructureMonitor} />}
				/>
				<Route
					path="infrastructure/:monitorId"
					element={<ProtectedRoute Component={InfrastructureDetailsWithAdminProp} />}
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
