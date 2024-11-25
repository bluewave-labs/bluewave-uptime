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
 *       xKey="createdAt"
 *       yKey="cpu.usage_percent"
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
	dataKey,
	xKey,
	yKey,
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
	const gradientId = `gradient-${uniqueId}`;
	return (
		<ResponsiveContainer
			width="100%"
			height={height}
			// FE team HELP!  Why does this overflow if set to 100%?
		>
			<AreaChart data={data}>
				<XAxis
					dataKey={xKey}
					{...(xTick && { tick: xTick })}
				/>
				<YAxis
					dataKey={yKey}
					{...(yTick && { tick: yTick })}
				/>
				{gradient === true &&
					createGradient({
						id: gradientId,
						startColor: gradientStartColor,
						endColor: gradientEndColor,
						direction: gradientDirection,
					})}
				<CartesianGrid
					stroke={theme.palette.border.light}
					strokeWidth={1}
					strokeOpacity={1}
					fill="transparent"
					vertical={false}
				/>
				<Area
					type="monotone"
					dataKey={dataKey}
					stroke={strokeColor}
					fill={gradient === true ? `url(#${gradientId})` : fillColor}
				/>
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
	dataKey: PropTypes.string.isRequired,
	xTick: PropTypes.object, // Recharts takes an instance of component, so we can't pass the component itself
	yTick: PropTypes.object, // Recharts takes an instance of component, so we can't pass the component itself
	xKey: PropTypes.string.isRequired,
	yKey: PropTypes.string.isRequired,
	fillColor: PropTypes.string,
	strokeColor: PropTypes.string,
	gradient: PropTypes.bool,
	gradientDirection: PropTypes.string,
	gradientStartColor: PropTypes.string,
	gradientEndColor: PropTypes.string,
	customTooltip: PropTypes.func,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomAreaChart;
