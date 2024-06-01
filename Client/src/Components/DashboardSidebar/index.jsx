import DashboardMenu from '../../Components/DashboardMenu';
import './index.css';

/**
 * @component
 * DashboardSidebar component serves as a sidebar containing the DashboardMenu.
 * 
 * @returns {JSX.Element} The JSX element representing the DashboardSidebar component.
 */

function DashboardSidebar() {
  return (
    <div className="dashboard-sidebar">
      <DashboardMenu />
    </div>
  );
}

export default DashboardSidebar;
