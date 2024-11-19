import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import "./index.css";

/**
 * A Performant SVG based circular gauge
 *
 * @component
 * @param {Object} props - Component properties
 * @param {number} [props.progress=0] - Progress percentage (0-100)
 * @param {number} [props.radius=60] - Radius of the gauge circle
 * @param {string} [props.color="#000000"] - Color of the progress stroke
 * @param {number} [props.strokeWidth=15] - Width of the gauge stroke
 *
 * @example
 * <CustomGauge
 *   progress={75}
 *   radius={50}
 *   color="#00ff00"
 *   strokeWidth={10}
 * />
 *
 * @returns {React.ReactElement} Rendered CustomGauge component
 */
const CustomGauge = ({
	progress = 0,
	radius = 60,
	color = "#000000",
	strokeWidth = 15,
}) => {
	// Calculate the length of the stroke for the circle
	const circumference = 2 * Math.PI * radius;
	const totalSize = radius * 2 + strokeWidth * 2; // This is the total size of the SVG, needed for the viewBox
	const strokeLength = (progress / 100) * circumference;
	const [offset, setOffset] = useState(circumference);
	const theme = useTheme();

	// Handle initial animation
	useEffect(() => {
		setOffset(circumference);
		const timer = setTimeout(() => {
			setOffset(circumference - strokeLength);
		}, 100);

		return () => clearTimeout(timer);
	}, [progress, circumference, strokeLength]);

	return (
		<Box
			className="radial-chart"
			width={radius}
			height={radius}
		>
			<svg
				viewBox={`0 0 ${totalSize} ${totalSize}`}
				width={radius}
				height={radius}
			>
				<circle
					className="radial-chart-base"
					stroke={theme.palette.background.fill}
					strokeWidth={strokeWidth}
					fill="none"
					cx={totalSize / 2} // Center the circle
					cy={totalSize / 2} // Center the circle
					r={radius}
				/>
				<circle
					className="radial-chart-progress"
					stroke={color}
					strokeWidth={strokeWidth}
					strokeDasharray={`${circumference} ${circumference}`}
					strokeDashoffset={offset}
					strokeLinecap="round"
					fill="none"
					cx={totalSize / 2}
					cy={totalSize / 2}
					r={radius}
				/>
			</svg>

			<Typography
				className="radial-chart-text"
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					...theme.typography.body2,
					fill: theme.typography.body2.color,
				}}
			>
				{`${progress}%`}
			</Typography>
		</Box>
	);
};

export default CustomGauge;

CustomGauge.propTypes = {
	progress: PropTypes.number,
	radius: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number,
};
