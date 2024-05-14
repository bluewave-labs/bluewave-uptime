import LanguageIcon from "@mui/icons-material/Language";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import SensorsIcon from "@mui/icons-material/Sensors";
import SettingsIcon from "@mui/icons-material/Settings";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import SvgIcon from '@mui/material/SvgIcon';
import './index.css'; 

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
      <div className="icon-container">
        <SvgIcon component={LanguageIcon} />
        <div className="text-container">
          <span className="dashboard-menu-text">Monitors</span>
        </div>
      </div>

      <div className="icon-container">
        <SvgIcon component={ReportGmailerrorredIcon} />
        <div className="text-container">
          <span className="dashboard-menu-text">Incidents</span>
        </div>
      </div>

      <div className="icon-container">
        <SvgIcon component={SensorsIcon} />
        <div className="text-container">
          <span className="dashboard-menu-text">Status Pages</span>
        </div>
      </div>

      <div className="icon-container">
        <SvgIcon component={AllInclusiveIcon} />
        <div className="text-container">
          <span className="dashboard-menu-text">Integrations</span>
        </div>
      </div>

      <div className="icon-container">
        <SvgIcon component={SettingsIcon} />
        <div className="text-container">
          <span className="dashboard-menu-text">Settings</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardMenu;
