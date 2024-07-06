import "./tooltipWithTail.css";
import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const CustomizedTooltip = styled(
  ({ className, placement, arrow, ...props }) => (
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

function TooltipWithTail({ placement, arrow = false, title, text }) {
  return (
    <div>
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
}

export default TooltipWithTail;
