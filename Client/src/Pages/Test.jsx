import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AutoCompleteField from "../Components/Inputs/Autocomplete";
import { useSelector } from "react-redux";

const Test = () => {
  const monitors = useSelector((state) => state.uptimeMonitors?.monitors);
  const [monitorState, setMonitorState] = useState([]);

  useEffect(() => {
    setMonitorState(monitors);
  }, [monitors]);

  console.log(monitorState);

  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <AutoCompleteField options={monitorState} />
    </Stack>
  );
};

export default Test;
