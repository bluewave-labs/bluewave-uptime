import DropdownTeamMember from "../../Components/DropdownTeamMember";
import Search from "../../Components/Search";
import "./index.css";
import DashboardMenu from "../../Components/DashboardMenu";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <DropdownTeamMember />
      <Search />
      <DashboardMenu />
    </>
  );
};

export default Home;
