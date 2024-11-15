import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { Text } from "recharts";
import { formatDateWithTz } from "../../../Utils/timeUtils";
import { Box, Stack, Typography } from "@mui/material";
export const TzTick = ({ x, y, payload, index }) => {
	const theme = useTheme();

	const uiTimezone = useSelector((state) => state.ui.timezone);

	// Render nothing for the first tick
	return (
		<Text
			x={x}
			y={y + 10}
			textAnchor="middle"
			fill={theme.palette.text.tertiary}
			fontSize={11}
			fontWeight={400}
		>
			{formatDateWithTz(payload?.value, "h:mm a", uiTimezone)}
		</Text>
	);
};

TzTick.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	payload: PropTypes.object,
	index: PropTypes.number,
};

export const PercentTick = ({ x, y, payload, index }) => {
	const theme = useTheme();
	if (index === 0) return null;
	return (
		<Text
			x={x - 20}
			y={y}
			textAnchor="middle"
			fill={theme.palette.text.tertiary}
			fontSize={11}
			fontWeight={400}
		>
			{`${payload?.value * 100}%`}
		</Text>
	);
};

PercentTick.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	payload: PropTypes.object,
	index: PropTypes.number,
};

export const InfrastructureTooltip = ({
	active,
	payload,
	label,
	yKey,
	yLabel,
	dotColor,
}) => {
	const uiTimezone = useSelector((state) => state.ui.timezone);
	const theme = useTheme();
	if (active && payload && payload.length) {
		const [hardwareType, metric] = yKey.split(".");
		return (
			<Box
				className="area-tooltip"
				sx={{
					backgroundColor: theme.palette.background.main,
					border: 1,
					borderColor: theme.palette.border.dark,
					borderRadius: theme.shape.borderRadius,
					py: theme.spacing(2),
					px: theme.spacing(4),
				}}
			>
				<Typography
					sx={{
						color: theme.palette.text.tertiary,
						fontSize: 12,
						fontWeight: 500,
					}}
				>
					{formatDateWithTz(label, "ddd, MMMM D, YYYY, h:mm A", uiTimezone)}
				</Typography>
				<Box mt={theme.spacing(1)}>
					<Box
						display="inline-block"
						width={theme.spacing(4)}
						height={theme.spacing(4)}
						backgroundColor={dotColor}
						sx={{ borderRadius: "50%" }}
					/>
					<Stack
						display="inline-flex"
						direction="row"
						justifyContent="space-between"
						ml={theme.spacing(3)}
						sx={{
							"& span": {
								color: theme.palette.text.tertiary,
								fontSize: 11,
								fontWeight: 500,
							},
						}}
					>
						<Typography
							component="span"
							sx={{ opacity: 0.8 }}
						>
							{`${yLabel} ${payload[0].payload[hardwareType][metric] * 100}%`}
						</Typography>
						<Typography component="span"></Typography>
					</Stack>
				</Box>
				{/* Display original value */}
			</Box>
		);
	}
	return null;
};

InfrastructureTooltip.propTypes = {
	active: PropTypes.bool,
	payload: PropTypes.array,
	label: PropTypes.string,
	yKey: PropTypes.string,
	yLabel: PropTypes.string,
	dotColor: PropTypes.string,
};
