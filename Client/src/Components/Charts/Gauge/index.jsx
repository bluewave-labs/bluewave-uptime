import { RadialBarChart, RadialBar, ResponsiveContainer, Text, Legend } from "recharts";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const MINIMUM_VALUE = 0;
const MAXIMUM_VALUE = 100;
const PROGRESS_THRESHOLD = 50;
const DEFAULT_WIDTH = 60;
// const DEFAULT_CONTAINER_HEIGHT = 160;
// const TEXT_POSITIONS = {
// 	value: { x: "50%", y: "45%" },
// 	label: { x: "50%", y: "55%" },
// };

const RADIUS = "90%";
const START_ANGLE = 90;
const CHART_RANGE = 360;
const RADIAL_BAR_CHART_PROPS = {
	innerRadius: RADIUS,
	outerRadius: RADIUS,
	barSize: 6,
	startAngle: START_ANGLE,
	endAngle: START_ANGLE - CHART_RANGE,
	margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

const COMMON_RADIAL_BAR_PROPS = {
	dataKey: "value",
	cornerRadius: 8,
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
	containerWidth,
	// displayText,
	// containerHeight,
	// gaugeHeader,
	// gaugeSubheader,
}) => {
	const theme = useTheme();
	const myProgressValue = Math.max(MINIMUM_VALUE, Math.min(progressValue, MAXIMUM_VALUE));
	const chartData = [
		{
			value: MAXIMUM_VALUE,
			fill: "transparent",
		},
		{
			value: myProgressValue,
			fill:
				progressValue > PROGRESS_THRESHOLD
					? theme.palette.primary.main
					: theme.palette.percentage.uptimePoor,
		},
	];
	const width = containerWidth ?? DEFAULT_WIDTH;

	return (
		<ResponsiveContainer
			aspect={1}
			width={width}

			/* height={containerHeight ?? DEFAULT_CONTAINER_HEIGHT}
			width={containerWidth} */
		>
			<RadialBarChart
				{...RADIAL_BAR_CHART_PROPS}
				data={chartData /* [{ ...DATA, fill: "#666666" }, { value: myProgressValue }] */}
			>
				<RadialBar
					{...COMMON_RADIAL_BAR_PROPS}
					fill={
						progressValue > PROGRESS_THRESHOLD
							? theme.palette.primary.main
							: theme.palette.percentage.uptimePoor
					}
					background={{ fill: theme.palette.background.fill }}
					label={{
						position: "center",
						fill: "#000000",
						content: () => (
							<text
								x="50%"
								y="50%"
								textAnchor="middle"
								dominantBaseline="middle"
								style={{
									fontSize: "12px",
									fill: "#000000",
								}}
							>{`${myProgressValue}%`}</text>
						),
					}}
					/* data={[{ value: myProgressValue }]} */
				/>

				{/* <RadialBar
					{...COMMON_RADIAL_BAR_PROPS}
					data={DATA}
					style={RADIAL_BAR_OVERLAY_PROPS}
				/> */}
				{/* TODO what is the text tag? */}
				{/* <text
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
				</text> */}
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
export { Gauge };
