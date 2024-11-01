import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const DATA = [{ value: 100 }];
const PRGRESS_THRESHOLD = 50;
const DEFAULT_CONTAINER_HEIGHT = 160;
const DEFAULT_HEADER_FONT = { fontSize: "11px" };
const DEFAULT_SUBHEADER_FONT = { fontSize: "9px" };
const TEXT_POSITIONS = {
	value: { x: "50%", y: "45%" },
	label: { x: "50%", y: "55%" },
};
const COMMON_RADIALBAR_PROPS = {
	minAngle: 15,
	clockWise: true,
	dataKey: "value",
	cornerRadius: 0,
};

const RADIALBARCHART_PROPS = {
	cx: "50%",
	cy: "50%",
	innerRadius: "45%",
	outerRadius: "100%",
	startAngle: 90,
	endAngle: -270,
};

const RADIALBAR_OVERLAY_PROPS = {
	transform: "rotate(180deg)",
	position: "absolute",
	top: "0",
	left: "0",
};

const Gauge = ({
	progressValue,
	displayText,
	theme,
	containerHeight,
	gaugeHeader,
	gaugeSubheader,
}) => {
	const header = gaugeHeader ?? DEFAULT_HEADER_FONT;
	const subheader = gaugeSubheader ?? DEFAULT_SUBHEADER_FONT;
	const myProgressValue =
		progressValue < 0 ? 0 : progressValue > DATA[0].value ? DATA[0].value : progressValue;

	return (
		<ResponsiveContainer height={containerHeight ?? DEFAULT_CONTAINER_HEIGHT}>
			<RadialBarChart
				{...RADIALBARCHART_PROPS}
				data={DATA}
			>
				<RadialBar
					{...COMMON_RADIALBAR_PROPS}
					fill={
						progressValue > PRGRESS_THRESHOLD
							? theme.palette.primary.main
							: theme.palette.percentage.uptimePoor
					}
					background={{ fill: theme.palette.background.fill }}
					data={[{ value: myProgressValue }]}
				/>
				<RadialBar
					{...COMMON_RADIALBAR_PROPS}
					data={DATA}
					style={RADIALBAR_OVERLAY_PROPS}
				/>
				<text
					{...TEXT_POSITIONS.value}
					role="text"
					aria-label={`${myProgressValue}%`}
					style={{ ...theme.palette.gaugeHeaderCommon, ...header }}
				>
					{`${myProgressValue}%`}
				</text>
				<text
					{...TEXT_POSITIONS.label}
					role="text"
					aria-label={`${displayText}`}
					style={{ ...theme.palette.gaugeHeaderCommon, ...subheader }}
				>
					{`${displayText}`}
				</text>
			</RadialBarChart>
		</ResponsiveContainer>
	);
};

Gauge.propTypes = {
	progressValue: PropTypes.number.isRequired,
	displayText: PropTypes.string.isRequired,
	theme: PropTypes.object.isRequired,
	containerHeight: PropTypes.number,
	gaugeHeader: PropTypes.object,
	gaugeSubheader: PropTypes.object,
};
export default Gauge;
