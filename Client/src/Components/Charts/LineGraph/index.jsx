import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Stack } from "@mui/material";
import { useMemo } from "react";

const LineGraph = ({
	chartData = [],
	chartConfig = {},
	styleConfig = {},
	onClickHandler,
	onMouseEnterHandler,
	onMouseMoveHandler,
	onMouseLeaveHandler,
}) => {
	const theme = useTheme();

	const memoizedChartData = useMemo(() => {
		return chartData.length ? chartData : [];
	}, [chartData]);

	const { unit = "", metricName = "value" } = chartConfig;

	const {
		width = "100%",
		height = 300,
		chartStrokeColor = theme.palette.primary.main,
		marginObject = { top: 5, right: 5, bottom: 5, left: 5 },
	} = styleConfig;

	if (!memoizedChartData.length) {
		const noDataStyle = {
			...theme.typography.h1,
			fontFamily: theme.typography.fontFamily,
			textAlign: "center",
			marginBottom: "20px",
		};
		return (
			<Stack spacing={1}>
				<ResponsiveContainer
					width={width}
					height={height}
				>
					<LineChart
						data={[]}
						margin={{ bottom: 0 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis />
						<YAxis />
					</LineChart>
				</ResponsiveContainer>
				<div style={noDataStyle}>No chart data available</div>
			</Stack>
		);
	}

	return (
		<ResponsiveContainer
			width={width}
			height={height}
		>
			<LineChart
				data={memoizedChartData}
				margin={marginObject}
				onClick={onClickHandler}
				onMouseEnter={onMouseEnterHandler}
				onMouseMove={onMouseMoveHandler}
				onMouseLeave={onMouseLeaveHandler}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="time" />
				<YAxis label={{ value: unit, angle: -90, position: "insideLeft" }} />
				<Tooltip
					formatter={(value) => {
						return [`${value} ${unit}`, metricName];
					}}
				/>
				<Legend
					formatter={() => {
						return metricName;
					}}
				/>
				<Line
					type="monotone"
					dataKey="value"
					stroke={chartStrokeColor}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

LineGraph.propTypes = {
	chartData: PropTypes.arrayOf(
		PropTypes.shape({
			time: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		})
	),
	chartConfig: PropTypes.shape({
		unit: PropTypes.string,
		metricName: PropTypes.string,
	}),
	styleConfig: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number,
		chartStrokeColor: PropTypes.string,
		marginObject: PropTypes.shape({
			top: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
			left: PropTypes.number,
		}),
	}),
	onClickHandler: PropTypes.func,
	onMouseEnterHandler: PropTypes.func,
	onMouseMoveHandler: PropTypes.func,
	onMouseLeaveHandler: PropTypes.func,
};

export default LineGraph;
