import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Fallback from "../../Components/Fallback";
import "./index.css";

const Maintenance = ({ isAdmin }) => {
  const theme = useTheme();

  return (
    <Box
      className="maintenance"
      sx={{
        ':has(> [class*="fallback__"])': {
          position: "relative",
          border: 1,
          borderColor: theme.palette.border.light,
          borderRadius: theme.shape.borderRadius,
          borderStyle: "dashed",
          backgroundColor: theme.palette.background.main,
          overflow: "hidden",
        },
      }}
    >
      <Fallback
        title="maintenance window"
        checks={[
          "Mark your maintenance periods",
          "Eliminate any misunderstandings",
          "Stop sending alerts in maintenance windows",
          "Coming soon!",
        ]}
        link="/maintenance/create"
        isAdmin={isAdmin}
        isEnabled={false}
      />
    </Box>
  );
};

export default Maintenance;
