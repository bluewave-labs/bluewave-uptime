import { useNavigate } from "react-router";
import Button from "../../../Components/Button";
import WestRoundedIcon from "@mui/icons-material/WestRounded";

import "./index.css";
import { useTheme } from "@emotion/react";

/**
 * Configure component displays monitor configurations and allows for editing actions.
 * @component
 */
const Configure = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <div
      className="configure-monitor"
      style={{
        maxWidth: "1200px",
        padding: `${theme.content.pY} ${theme.content.pX}`,
      }}
    >
      <Button
        level="tertiary"
        label="Back"
        img={<WestRoundedIcon />}
        onClick={() => navigate(-1)}
        sx={{
          backgroundColor: "#f4f4f4",
          mb: theme.gap.medium,
          px: theme.gap.ml,
          "& svg.MuiSvgIcon-root": {
            pr: theme.gap.small,
          },
        }}
      />
    </div>
  );
};

export default Configure;
