import DropdownTeamMember from "../../Components/DropdownTeamMember";
import Search from "../../Components/Search";
import "./index.css";
import DashboardMenu from "../../Components/DashboardMenu";
import Integrations from "../../Components/Integrations";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <DropdownTeamMember />
      <Search />
      <DashboardMenu />
      <Integrations />
    </>
  );
};

export default Home;
