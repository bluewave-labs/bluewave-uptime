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

/**
 * Builds table data for a list of monitors.
 *
 * @param {Array} monitors - An array of monitor objects containing information about each monitor.
 * @param {boolean} isAdmin - Flag indicating if the current user is an admin.
 * @param {Function} navigate - A function to navigate to the monitor detail page.
 * @returns {Object} The data structure containing columns and rows for the table.
 */
export const buildData = (monitors, isAdmin, navigate) => {
  const theme = useTheme();

  data.rows = monitors.map((monitor, idx) => {
    let uptimePercentage = "";
    let percentageColor = theme.palette.percentage.green; 

    // Determine uptime percentage and color based on the monitor's uptimePercentage value
    if (monitor.uptimePercentage !== undefined) {
      uptimePercentage =
        monitor.uptimePercentage === 0
          ? "0"
          : (monitor.uptimePercentage * 100).toFixed(2);

      percentageColor =
        monitor.uptimePercentage < 0.25
          ? theme.palette.percentage.red
          : monitor.uptimePercentage < 0.5
          ? theme.palette.percentage.orange
          : monitor.uptimePercentage < 0.75
          ? theme.palette.percentage.yellow
          : theme.palette.percentage.green;
    }

    const params = {
      url: monitor.url,
      title: monitor.name,
      percentage: uptimePercentage,
      percentageColor, 
      status: monitor.status === true ? "up" : "down",
    };

    // Reverse checks so the latest check is on the right
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
