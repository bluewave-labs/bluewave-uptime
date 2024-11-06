import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const MINIMUM_VALUE = 0 ;
const MAXIMUM_VALUE = 100 ;
const DATA = [{ value: MAXIMUM_VALUE }];
const PROGRESS_THRESHOLD = 50;
const DEFAULT_CONTAINER_HEIGHT = 160;
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

const COMMON_HEADER_PROPS = {
	textAnchor: "middle",
	dominantBaseline: "middle",
};

const Gauge = ({
	progressValue,
	displayText,
	containerHeight,
	gaugeHeader,
	gaugeSubheader,
}) => {
    const theme = useTheme();
	const myProgressValue = Math.max(MINIMUM_VALUE, Math.min(progressValue, MAXIMUM_VALUE));

	return (
		<ResponsiveContainer height={containerHeight ?? DEFAULT_CONTAINER_HEIGHT}>
			<RadialBarChart
				{...RADIALBARCHART_PROPS}
				data={DATA}
			>
				<RadialBar
					{...COMMON_RADIALBAR_PROPS}
					fill={
						progressValue > PROGRESS_THRESHOLD
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
					style={{...COMMON_HEADER_PROPS, ...theme.chart.header, ...gaugeHeader }}
				>
					{`${myProgressValue}%`}
				</text>
				<text
					{...TEXT_POSITIONS.label}
					role="text"
					aria-label={`${displayText}`}
					style={{...COMMON_HEADER_PROPS,  ...theme.chart.subheader, ...gaugeSubheader }}
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
	containerHeight: PropTypes.number,
	gaugeHeader: PropTypes.object,
	gaugeSubheader: PropTypes.object,
};
export default Gauge;
