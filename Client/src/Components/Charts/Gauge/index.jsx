import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const MINIMUM_VALUE = 0;
const MAXIMUM_VALUE = 100;
const DATA = [{ value: MAXIMUM_VALUE }];
const PROGRESS_THRESHOLD = 50;
const DEFAULT_CONTAINER_HEIGHT = 160;
const TEXT_POSITIONS = {
	value: { x: "50%", y: "45%" },
	label: { x: "50%", y: "55%" },
};
const COMMON_RADIAL_BAR_PROPS = {
	minAngle: 15,
	clockWise: true,
	dataKey: "value",
	cornerRadius: 0,
};

const RADIAL_BAR_CHART_PROPS = {
	cx: "50%",
	cy: "50%",
	innerRadius: "45%",
	outerRadius: "100%",
	startAngle: 90,
	endAngle: -270,
};

const RADIAL_BAR_OVERLAY_PROPS = {
	transform: "rotate(180deg)",
	position: "absolute",
	top: "0",
	left: "0",
};

const COMMON_HEADER_PROPS = {
	textAnchor: "middle",
	dominantBaseline: "middle",
};

/**
 * A circular gauge component that displays a progress value and text.
 * The gauge fills based on the progress value and changes color at a 50% threshold.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.progressValue - The value to display in the gauge (0-100)
 * @param {string} props.displayText - The text to display below the progress value
 * @param {number} [props.containerHeight=160] - Height of the gauge container in pixels
 * @param {Object} [props.gaugeHeader] - Custom styles to apply to the progress value text
 * @param {Object} [props.gaugeSubheader] - Custom styles to apply to the display text
 *
 * @returns {JSX.Element} A circular gauge chart with progress value and text
 *
 * @example
 * <Gauge
 *   progressValue={75}
 *   displayText="Completion"
 *   containerHeight={200}
 *   gaugeHeader={{ fontSize: '24px' }}
 *   gaugeSubheader={{ fill: 'gray' }}
 * />
 */
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
				{...RADIAL_BAR_CHART_PROPS}
				data={DATA}
			>
				<RadialBar
					{...COMMON_RADIAL_BAR_PROPS}
					fill={
						progressValue > PROGRESS_THRESHOLD
							? theme.palette.primary.main
							: theme.palette.percentage.uptimePoor
					}
					background={{ fill: theme.palette.background.fill }}
					data={[{ value: myProgressValue }]}
				/>
				<RadialBar
					{...COMMON_RADIAL_BAR_PROPS}
					data={DATA}
					style={RADIAL_BAR_OVERLAY_PROPS}
				/>
				<text
					{...TEXT_POSITIONS.value}
					role="text"
					aria-label={`${myProgressValue}%`}
					style={{ ...COMMON_HEADER_PROPS, ...theme.chart.header, ...gaugeHeader }}
				>
					{`${myProgressValue}%`}
				</text>
				<text
					{...TEXT_POSITIONS.label}
					role="text"
					aria-label={`${displayText}`}
					style={{ ...COMMON_HEADER_PROPS, ...theme.chart.subheader, ...gaugeSubheader }}
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
