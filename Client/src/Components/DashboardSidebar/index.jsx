import DashboardMenu from '../../Components/DashboardMenu';
import SupportIcon from '@mui/icons-material/Support'; 
import SvgIcon from '@mui/material/SvgIcon';
import './index.css';

/**
 * @component
 * DashboardSidebar component serves as a sidebar containing the DashboardMenu and a Support icon at the bottom.
 * 
 * @returns {JSX.Element} The JSX element representing the DashboardSidebar component.
 */

function DashboardSidebar() {
  return (
    <div className="dashboard-sidebar">
      <div className="menu-container">
        <DashboardMenu />
      </div>
      <div className="support-container">
        <SvgIcon component={SupportIcon} />
        <span className="support-text">Support</span>
      </div>
    </div>
  );
}

export default DashboardSidebar;
