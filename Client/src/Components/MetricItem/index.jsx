import ServerStatus from "../../Components/Charts/Servers/ServerStatus";

function MetricItem() {
  return (
    <>
      <div className="play-ground-charts-spacing" />
      <div className="play-ground-charts">
        <ServerStatus title="Up" value="4" state="up" />
        <ServerStatus title="Down" value="0" state="down" />
        <ServerStatus title="Paused" value="0" state="pause" />
      </div>
    </>
  );
}

export default MetricItem;