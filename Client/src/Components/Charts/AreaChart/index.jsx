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

const CustomAreaChart = ({
	data,
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
}) => {
	const theme = useTheme();
	return (
		<ResponsiveContainer
			width="100%"
			height="100%"
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
					dataKey="cpu.usage_percent"
					stroke={strokeColor}
					fill={gradient === true ? "url(#colorUv)" : fillColor}
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
	customTooltip: PropTypes.object,
};

export default CustomAreaChart;
