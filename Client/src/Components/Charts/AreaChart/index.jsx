import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { createGradient } from "../Utils/gradientUtils";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";
import { useId } from "react";
import { Fragment } from "react";
/**
 * CustomAreaChart component for rendering an area chart with optional gradient and custom ticks.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.data - The data array for the chart.
 * @param {string} props.xKey - The key for the x-axis data.
 * @param {string} props.yKey - The key for the y-axis data.
 * @param {Object} [props.xTick] - Custom tick component for the x-axis.
 * @param {Object} [props.yTick] - Custom tick component for the y-axis.
 * @param {string} [props.strokeColor] - The stroke color for the area.
 * @param {string} [props.fillColor] - The fill color for the area.
 * @param {boolean} [props.gradient=false] - Whether to apply a gradient fill.
 * @param {string} [props.gradientDirection="vertical"] - The direction of the gradient.
 * @param {string} [props.gradientStartColor] - The start color of the gradient.
 * @param {string} [props.gradientEndColor] - The end color of the gradient.
 * @param {Object} [props.customTooltip] - Custom tooltip component.
 * @returns {JSX.Element} The rendered area chart component.
 *
 * @example
 * // Example usage of CustomAreaChart
 * import React from 'react';
 * import CustomAreaChart from './CustomAreaChart';
 * import { TzTick, PercentTick, InfrastructureTooltip } from './chartUtils';
 *
 * const data = [
 *   { createdAt: '2023-01-01T00:00:00Z', cpu: { usage_percent: 0.5 } },
 *   { createdAt: '2023-01-01T01:00:00Z', cpu: { usage_percent: 0.6 } },
 *   // more data points...
 * ];
 *
 * const MyChartComponent = () => {
 *   return (
 *     <CustomAreaChart
 *       data={data}
 *       dataKeys={["cpu.usage_percent"]}
 *       xKey="createdAt"
 * 		 xDomain={["2023-01-01T00:00:00Z", "2023-01-01T02:00:00Z"]}
 *       yKey="cpu.usage_percent"
 *       yDomain={[0, 1]}
 *       xTick={<TzTick />}
 *       yTick={<PercentTick />}
 *       strokeColor="#8884d8"
 *       fillColor="#8884d8"
 *       gradient={true}
 *       gradientStartColor="#8884d8"
 *       gradientEndColor="#82ca9d"
 *       customTooltip={({ active, payload, label }) => (
 *         <InfrastructureTooltip
 *           label={label?.toString() ?? ""}
 *           yKey="cpu.usage_percent"
 *           yLabel="CPU Usage"
 *           active={active}
 *           payload={payload}
 *         />
 *       )}
 *     />
 *   );
 * };
 *
 * export default MyChartComponent;
 */
const CustomAreaChart = ({
	data,
	dataKeys,
	xKey,
	xDomain,
	yKey,
	yDomain,
	xTick,
	yTick,
	strokeColor,
	fillColor,
	gradient = false,
	gradientDirection = "vertical",
	gradientStartColor,
	gradientEndColor,
	customTooltip,
	height = "100%",
}) => {
	const theme = useTheme();
	const uniqueId = useId();

	const AREA_COLORS = [
		// Blues
		"#3182bd", // Deep blue
		"#6baed6", // Medium blue
		"#9ecae1", // Light blue

		// Greens
		"#74c476", // Soft green
		"#a1d99b", // Light green
		"#c7e9c0", // Pale green

		// Oranges
		"#fdae6b", // Warm orange
		"#fdd0a2", // Light orange
		"#feedde", // Pale orange

		// Purples
		"#9467bd", // Lavender
		"#a55194", // Deep magenta
		"#c994c7", // Soft magenta

		// Reds
		"#ff9896", // Soft red
		"#de2d26", // Deep red
		"#fc9272", // Medium red

		// Cyans/Teals
		"#17becf", // Cyan
		"#7fcdbb", // Teal
		"#a1dab4", // Light teal

		// Yellows
		"#fec44f", // Mustard
		"#fee391", // Light yellow
		"#ffffd4", // Pale yellow

		// Additional colors
		"#e377c2", // Soft pink
		"#bcbd22", // Olive
		"#2ca02c", // Vibrant green
	];

	return (
		<ResponsiveContainer
			width="100%"
			height={height}
			// FE team HELP!  Why does this overflow if set to 100%?
		>
			<AreaChart data={data}>
				<XAxis
					dataKey={xKey}
					{...(xDomain && { domain: xDomain })}
					{...(xTick && { tick: xTick })}
				/>
				<YAxis
					dataKey={yKey}
					{...(yDomain && { domain: yDomain })}
					{...(yTick && { tick: yTick })}
				/>

				<CartesianGrid
					stroke={theme.palette.border.light}
					strokeWidth={1}
					strokeOpacity={1}
					fill="transparent"
					vertical={false}
				/>
				{dataKeys.map((dataKey, index) => {
					const gradientId = `gradient-${uniqueId}-${index}`;

					return (
						<Fragment key={dataKey}>
							{gradient === true &&
								createGradient({
									id: gradientId,
									startColor: gradientStartColor || AREA_COLORS[index],
									endColor: gradientEndColor,
									direction: gradientDirection,
								})}
							<Area
								yKey={dataKey}
								key={dataKey}
								type="monotone"
								dataKey={dataKey}
								stroke={strokeColor || AREA_COLORS[index]}
								fill={gradient === true ? `url(#${gradientId})` : fillColor}
							/>
						</Fragment>
					);
				})}
				{customTooltip ? (
					<Tooltip
						cursor={{ stroke: theme.palette.border.light }}
						content={customTooltip}
						wrapperStyle={{ pointerEvents: "none" }}
					/>
				) : (
					<Tooltip />
				)}
			</AreaChart>
		</ResponsiveContainer>
	);
};

CustomAreaChart.propTypes = {
	data: PropTypes.array.isRequired,
	dataKeys: PropTypes.array.isRequired,
	xTick: PropTypes.object, // Recharts takes an instance of component, so we can't pass the component itself
	yTick: PropTypes.object, // Recharts takes an instance of component, so we can't pass the component itself
	xKey: PropTypes.string.isRequired,
	xDomain: PropTypes.array,
	yKey: PropTypes.string,
	yDomain: PropTypes.array,
	fillColor: PropTypes.string,
	strokeColor: PropTypes.string,
	gradient: PropTypes.bool,
	gradientDirection: PropTypes.string,
	gradientStartColor: PropTypes.string,
	gradientEndColor: PropTypes.string,
	customTooltip: PropTypes.object,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomAreaChart;
