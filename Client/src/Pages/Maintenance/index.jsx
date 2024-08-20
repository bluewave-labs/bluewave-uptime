import Fallback from "../../Components/Fallback";
import "./index.css";

const Maintenance = () => {
  return (
    <div className="maintenance">
      <Fallback
        title="maintenance window"
        checks={[
          "Mark your maintenance periods",
          "Eliminate any misunderstandings",
          "Stop sending alerts in maintenance windows",
        ]}
        link="/maintenance/create"
      />
    </div>
  );
};

export default Maintenance;
