import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Incidents = () => {
  const monitorState = useSelector((state) => state.monitors);
  console.log(monitorState);
  return <div>Incidents</div>;
};

export default Incidents;
