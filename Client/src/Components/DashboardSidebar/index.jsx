import DashboardMenu from "../../Components/DashboardMenu";
import SvgIcon from "@mui/material/SvgIcon";
import "./index.css";
import SupportIcon from "../../assets/Images/Icon-support-gray.png";

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
        <img className="support-icon" src={SupportIcon} alt="SupportIcon" />
        <span className="support-text">Support</span>
      </div>
    </div>
  );
}

export default DashboardSidebar;
