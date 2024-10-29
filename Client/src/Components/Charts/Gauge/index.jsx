import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const Gauge = ({ progressValue, displayText, theme }) => {
	const myStyle = { fontSize: "12px", fill: theme.palette.text.tertiary };
	const textStyle = {
		textAnchor: "middle",
		dominantBaseline: "middle",
		style: myStyle
	};
	const data = [{ value: 100 }];
	return (
		<ResponsiveContainer
			width="100%"
			height={150}
		>
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
					minAngle={15}
					clockWise={true}
					dataKey="value"
					fill="#8884d8"
					background={{ fill: "#bed2ea" }}
					cornerRadius={0}
					data={[{ value: progressValue ?? 50 }]}
				/>
				<RadialBar
					minAngle={15}
					clockWise={true}
					dataKey="value"
					cornerRadius={0}
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
					textAnchor={textStyle.textAnchor}
					dominantBaseline={textStyle.dominantBaseline}
					style={textStyle.style}
				>
					{`${progressValue}%`}
				</text>
				<text
					x="50%"
					y="55%"
					textAnchor={textStyle.textAnchor}
					dominantBaseline={textStyle.dominantBaseline}
					style={textStyle.style}
				>
					{`${displayText}`}
				</text>
			</RadialBarChart>
		</ResponsiveContainer>
	);
};

Gauge.propTypes = {
	progressValue: PropTypes.string,
	displayText: PropTypes.string,
	theme: PropTypes.object,
};
export default Gauge;
