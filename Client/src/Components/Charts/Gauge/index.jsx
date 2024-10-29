import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const Gauge = ({ progressValue, displayText, theme }) => {
	const BASE_TEXT_STYLE = {
		textAnchor: "middle",
		dominantBaseline: "middle",
	};
	const getStyles = (theme) => ({
		text: {
			...BASE_TEXT_STYLE,
			style: { fontSize: "11px", fontWeight: 400, fill: theme.palette.text.tertiary				
			 },
		},
	});
	const data = [{ value: 100 }];
	const commonRadialBarProps = {
		minAngle: 15,
		clockWise: true,
		dataKey: "value",
		cornerRadius: 0
	};
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
					{...commonRadialBarProps}
					fill="#1570EF"
					background={{ fill: "#CDE2FF" }}
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
					{...getStyles(theme).text}
				>
					{`${progressValue}%`}
				</text>
				<text
					x="50%"
					y="55%"
					{...getStyles(theme).text}
					style={{fontSize: 9 }}
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
