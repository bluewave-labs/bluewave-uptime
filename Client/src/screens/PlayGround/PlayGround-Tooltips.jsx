import React from "react";
import TooltipWithTail from "../../components/Tooltips/TooltipWithTail/TooltipWithTail";
import "./playGround.css";

function PlayGroundTooltips() {
  return (
    <div className="tooltip-playground">
      <br />
      <TooltipWithTail
        placement="left"
        arrow={true}
        title="This is a tooltip"
        text="This is a tooltip"
      />
      <br />
      <TooltipWithTail placement="top" arrow={true} text="This is a tooltip" />
      <br />
      <TooltipWithTail
        placement="bottom"
        arrow={false}
        text="This is a tooltip"
      />
      <br />
      <TooltipWithTail
        placement="right"
        arrow={true}
        title="This is a tooltip"
        text="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
      />
    </div>
  );
}

export default PlayGroundTooltips;
