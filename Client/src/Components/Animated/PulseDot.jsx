import PropTypes from "prop-types";
import { Box, Stack } from "@mui/material";

/**
 * A component that renders a pulsating dot with a specified color.
 *
 * @component
 * @example
 * // Example usage:
 * <PulseDot color="#f00" />
 *
 * @param {Object} props
 * @param {string} props.color - The color of the dot.
 * @returns {JSX.Element} The PulseDot component.
 */

const PulseDot = ({ color }) => {
	return (
		<Stack
			width="26px"
			height="24px"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				minWidth="18px"
				minHeight="18px"
				sx={{
					position: "relative",
					backgroundColor: color,
					borderRadius: "50%",
					"&::before": {
						content: `""`,
						position: "absolute",
						width: "100%",
						height: "100%",
						backgroundColor: "inherit",
						borderRadius: "50%",
						animation: "ripple 1.8s ease-out infinite",
					},
					"&::after": {
						content: `""`,
						position: "absolute",
						width: "7px",
						height: "7px",
						borderRadius: "50%",
						backgroundColor: "white",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					},
				}}
			/>
		</Stack>
	);
};

PulseDot.propTypes = {
	color: PropTypes.string.isRequired,
};

export default PulseDot;
