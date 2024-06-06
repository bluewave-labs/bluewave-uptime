import "./index.css";
import DashboardMenuButton from "../DashboardMenuButton";

import Monitors from "../../assets/Images/Icon-monitor-gray.png";
import Incidents from "../../assets/Images/Icon-warning-gray.png";
import SensorsIcon from "../../assets/Images/Icon-signal-gray.png";
import AllInclusiveIcon from "../../assets/Images/Icon-link-gray.png";
import SettingsIcon from "../../assets/Images/Icon-setting-gray.png";

/**
 * @component
 * DashboardMenu component displays a menu with icons and corresponding text.
 * Each menu item consists of an icon and a text label.
 *
 * @returns {JSX.Element} The JSX element representing the DashboardMenu component.
 */

function DashboardMenu() {
  return (
    <div className="dashboard-menu-container">
      {DashboardMenuButton(Monitors, "Monitors")}
      {DashboardMenuButton(Incidents, "Incidents")}
      {DashboardMenuButton(SensorsIcon, "Status Pages")}
      {DashboardMenuButton(AllInclusiveIcon, "Integrations")}
      {DashboardMenuButton(SettingsIcon, "Settings")}
    </div>
  );
}

export default DashboardMenu;
