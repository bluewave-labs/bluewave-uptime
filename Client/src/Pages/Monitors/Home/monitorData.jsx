import Host from "./host";
import ActionsMenu from "./actionsMenu";
import BarChart from "../../../Components/Charts/BarChart";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { StatusLabel } from "../../../Components/Label";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

const data = {
  cols: [
    { id: 1, name: "Host" },
    {
      id: 2,
      name: (
        <Box width="max-content">
          Status
          <span>
            <ArrowDownwardRoundedIcon />
          </span>
        </Box>
      ),
    },
    { id: 3, name: "Response Time" },
    { id: 4, name: "Type" },
    { id: 5, name: "Actions" },
  ],
  rows: [],
};

export const buildData = (monitors, isAdmin, navigate) => {
  const theme = useTheme();

  data.rows = monitors.map((monitor, idx) => {
    let uptimePercentage = "";
    if (monitor.uptimePercentage !== undefined) {
      uptimePercentage =
        monitor.uptimePercentage === 0
          ? "0" 
          : monitor.uptimePercentage.toFixed(2); 
    }

    const params = {
      url: monitor.url,
      title: monitor.name,
      percentage: uptimePercentage,
      percentageColor:
        monitor.status === true
          ? theme.palette.success.main
          : theme.palette.error.text,
      status: monitor.status === true ? "up" : "down",
    };

    // Reverse checks so latest check is on the right
    const reversedChecks = monitor.checks.slice().reverse();

    return {
      id: monitor._id,
      handleClick: () => {
        navigate(`/monitors/${monitor._id}`);
      },
      data: [
        { id: idx, data: <Host params={params} /> },
        {
          id: idx + 1,
          data: (
            <StatusLabel
              status={params.status}
              text={params.status}
              customStyles={{ textTransform: "capitalize" }}
            />
          ),
        },
        { id: idx + 2, data: <BarChart checks={reversedChecks} /> },
        {
          id: idx + 3,
          data: (
            <span style={{ textTransform: "uppercase" }}>{monitor.type}</span>
          ),
        },
        {
          id: idx + 4,
          data: <ActionsMenu monitor={monitor} isAdmin={isAdmin} />,
        },
      ],
    };
  });
  return data;
};



