import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const data = [{ value: 100 }];
const commonRadialBarProps = {
	minAngle: 15,
	clockWise: true,
	dataKey: "value",
	cornerRadius: 0
};

const Gauge = ({ progressValue, displayText, theme }) => {
	return (
		<ResponsiveContainer>
			<RadialBarChart
				cx="50%"
				cy="50%"
				innerRadius="45%"
				outerRadius="100%"
				startAngle={90}
				endAngle={-270}
				data={data}
			>
				<RadialBar
					{...commonRadialBarProps}
					fill={
						progressValue > 50
							? theme.palette.primary.main
							: theme.palette.percentage.uptimePoor
					}
					background={{ fill: theme.palette.background.fill }}
					data={[{ value: progressValue }]}
				/>
				<RadialBar
					{...commonRadialBarProps}
					data={data}
					style={{
						transform: "rotate(180deg)",
						position: "absolute",
						top: "0",
						left: "0",
					}}
				/>
				<text
					x="50%"
					y="45%"
					style={theme.palette.gaugePercentageText}
				>
					{`${progressValue}%`}
				</text>
				<text
					x="50%"
					y="55%"
					style={theme.palette.gaugeDisplayText}
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
};
export default Gauge;
