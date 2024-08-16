import React, { useMemo } from "react";
import { Arc } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientLightgreenGreen } from "@visx/gradient";
import { scaleBand, scaleRadial } from "@visx/scale";
import { Text } from "@visx/text";
import { Line } from "@visx/shape";

import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { PropTypes } from "prop-types";
import { Stack, Typography } from "@mui/material";

const toDegrees = (x) => (x * 180) / Math.PI;

const barColor = "#93F9B9";

const color = {
  true: barColor,
  false: "var(--env-var-color-24)",
  undefined: "var(--env-var-color-33)",
};

// const color = {
//   true: "var(--env-var-color-23)",
//   false: "var(--env-var-color-24)",
//   undefined: "var(--env-var-color-33)",
// };

const margin = { top: 20, bottom: 20, left: 20, right: 20 };

const MonitorDetailsRadialBarChart = ({ data, width, height }) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const { TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });

  const handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    const svgRect = event.target.ownerSVGElement.getBoundingClientRect();

    const respTime =
      datum.status === undefined
        ? "No check yet"
        : datum.originalResponseTime + " ms";

    let createdAt =
      datum.createdAt !== undefined
        ? new Date(datum.createdAt).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
        : undefined;

    // This defines what is dispalyed in the Tooltip
    const displayData = (
      <Stack>
        <Typography>{"Response time: " + respTime}</Typography>
        {createdAt !== undefined && (
          <Typography>{"Time: " + createdAt}</Typography>
        )}
      </Stack>
    );
    showTooltip({
      tooltipLeft: coords.x + svgRect.left,
      tooltipTop: coords.y + svgRect.top,
      tooltipData: displayData,
    });
  };

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radiusMax = Math.min(xMax, yMax) / 2;

  const innerRadius = radiusMax / 3;

  const xDomain = useMemo(() => data.map((_, idx) => idx), []);

  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, 2 * Math.PI],
        domain: xDomain,
        padding: 0.2,
      }),
    [xDomain]
  );

  const yScale = useMemo(
    () =>
      scaleRadial({
        range: [innerRadius, radiusMax],
        domain: [0, Math.max(...data.map((d) => d.responseTime))],
      }),
    [innerRadius, radiusMax, data]
  );

  return width < 10 ? null : (
    <>
      <svg width={width} height={height}>
        <GradientLightgreenGreen id="radial-bars-green" />
        <rect
          width={width}
          height={height}
          fill="url(#radial-bars-green)"
          rx={14}
        />
        <Group top={yMax / 2 + margin.top} left={xMax / 2 + margin.left}>
          {data.map((d, idx) => {
            let startAngle = xScale(idx);
            let midAngle = startAngle + xScale.bandwidth() / 2;
            let endAngle = startAngle + xScale.bandwidth();

            if (data.length < 60) {
              startAngle /= 2;
              endAngle /= 2;
              midAngle /= 2;
            }
            const outerRadius = yScale(d.responseTime) ?? 0;

            // Convert from polar to cartesian
            const textRadius = radiusMax + 2;
            const textX = textRadius * Math.cos(midAngle - Math.PI / 2);
            const textY = textRadius * Math.sin(midAngle - Math.PI / 2);

            const lineStartX =
              (outerRadius + 1) * Math.cos(midAngle - Math.PI / 2);
            const lineStartY =
              (outerRadius + 1) * Math.sin(midAngle - Math.PI / 2);
            const lineEndX = (radiusMax - 1) * Math.cos(midAngle - Math.PI / 2);
            const lineEndY = (radiusMax - 1) * Math.sin(midAngle - Math.PI / 2);

            return (
              <React.Fragment key={`fragment-${idx}`}>
                <Arc
                  cornerRadius={4}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  fill={color[d.status]}
                  onMouseOver={(e) => handleMouseOver(e, d)}
                  onMouseOut={hideTooltip}
                />
                {idx === 0 && (
                  <Line
                    from={{
                      x: lineStartX,
                      y: lineStartY,
                    }}
                    to={{
                      x: lineEndX,
                      y: lineEndY,
                    }}
                    stroke={"black"}
                    strokeDasharray={"5,5"}
                  />
                )}
                {idx === Math.floor(data.length * (1 / 3)) && (
                  <Line
                    from={{
                      x: lineStartX,
                      y: lineStartY,
                    }}
                    to={{
                      x: lineEndX,
                      y: lineEndY,
                    }}
                    stroke={"black"}
                    strokeDasharray={"5,5"}
                  />
                )}
                <Text
                  x={textX}
                  y={textY}
                  dominantBaseline="end"
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight="bold"
                  fill={barColor}
                  angle={toDegrees(midAngle)}
                >
                  {idx === 0
                    ? "Now"
                    : idx === Math.floor(data.length * (1 / 3))
                    ? "20 mins ago"
                    : ""}
                </Text>
              </React.Fragment>
            );
          })}
        </Group>
      </svg>

      {tooltipOpen && (
        <TooltipInPortal
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          {tooltipData}
        </TooltipInPortal>
      )}
    </>
  );
};

MonitorDetailsRadialBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default MonitorDetailsRadialBarChart;
