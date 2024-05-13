import language from '@mui/icons-material/language';
import report_gmailerrorred from '@mui/icons-material/reportGmailerrorred';
import sensors from '@mui/icons-material/sensors';
import settings from '@mui/icons-material/settings';
import all_inclusive from '@mui/icons-material/AllInclusive';
import SvgIcon from '@mui/material/SvgIcon';
import './index.css'; 

/**
 * DashboardMenu component displays a menu with icons and corresponding text.
 * Each menu item consists of an icon and a text label.
 * 
 * @returns {JSX.Element} The JSX element representing the DashboardMenu component.
 */

function DashboardMenu() {
  return (
    <div className="dashboard-menu-container"> 
      <div className="icon-container">
        <SvgIcon component={language} />
        <div className="text-container">
          <span className="dashboard-menu-text">Monitors</span>
        </div>
      </div>

      <div className="icon-container">
        <SvgIcon component={report_gmailerrorred} />
        <div className="text-container">
          <span className="dashboard-menu-text">Incidents</span>
        </div>
      </div>

      <div className="icon-container">
        <SvgIcon component={sensors} />
        <div className="text-container">
          <span className="dashboard-menu-text">Status Pages</span>
        </div>
      </div>

      <div className="icon-container">
        <SvgIcon component={all_inclusive} />
        <div className="text-container">
          <span className="dashboard-menu-text">Integrations</span>
        </div>
      </div>

      <div className="icon-container">
        <SvgIcon component={settings} />
        <div className="text-container">
          <span className="dashboard-menu-text">Settings</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardMenu;
