import "./tooltipWithTail.css";
import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useTheme } from "@mui/material";

const CustomizedTooltip = styled(
  ({ className, placement, arrow, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      placement={placement}
      arrow={arrow}
      classes={{ popper: className }}
    />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
}));

const TooltipWithTail = ({ placement, arrow = false, title, text }) => {
  const theme = useTheme();

  const fontLookup = {
    default: theme.font.default.font,
  };

  const fontFamily = fontLookup["default"];

  return (
    <div style={{ fontFamily: fontFamily }}>
      <CustomizedTooltip
        arrow={arrow}
        placement={placement}
        title={
          <React.Fragment>
            {title && <div className="tooltip-title">{title}</div>}
            <div className="tooltip-description">{text}</div>
          </React.Fragment>
        }
        className="tooltip-holder"
      >
        <HelpOutlineIcon style={{ fill: "#98A2B3" }} />
      </CustomizedTooltip>
    </div>
  );
};

export default TooltipWithTail;
