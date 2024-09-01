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
    let percentageColor = theme.palette.success.main; 

    if (monitor.uptimePercentage !== undefined) {
      uptimePercentage =
        monitor.uptimePercentage === 0
          ? "0"
          : (monitor.uptimePercentage * 100).toFixed(2);

          if (monitor.uptimePercentage < 0.25) {
            percentageColor = theme.palette.error.text;
          } else if (monitor.uptimePercentage >= 0.25 && monitor.uptimePercentage < 0.5) {
            percentageColor = theme.palette.warning.main;
          } else if (monitor.uptimePercentage >= 0.5 && monitor.uptimePercentage < 0.75) {
            percentageColor = theme.palette.warning.light;
          } else if (monitor.uptimePercentage >= 0.75 && monitor.uptimePercentage <= 1) {
            percentageColor = theme.palette.success.main;
          }
        }

    const params = {
      url: monitor.url,
      title: monitor.name,
      percentage: uptimePercentage,
      percentageColor, 
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



