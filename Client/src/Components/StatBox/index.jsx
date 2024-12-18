import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const StatBox = ({ heading, stat, subHeading, sx }) => {
	const theme = useTheme();
	console.log(sx);
	return (
		<Box
			sx={{
				padding: `${theme.spacing(4)} ${theme.spacing(8)}`,
				minWidth: 200,
				width: 225,
				border: 1,
				borderStyle: "solid",
				borderColor: theme.palette.border.light,
				borderRadius: 4,
				backgroundColor: theme.palette.background.main,
				background: `linear-gradient(340deg, ${theme.palette.background.accent} 20%, ${theme.palette.background.main} 45%)`,
				"& h2": {
					fontSize: 13,
					fontWeight: 500,
					color: theme.palette.text.secondary,
					textTransform: "uppercase",
				},
				"& p": {
					fontSize: 18,
					color: theme.palette.text.primary,
					marginTop: theme.spacing(2),
					"& span": {
						color: theme.palette.text.tertiary,
						marginLeft: theme.spacing(2),
						fontSize: 15,
					},
				},
				...sx,
			}}
		>
			<Typography component="h2">{heading}</Typography>
			<Typography>{subHeading}</Typography>
		</Box>
	);
};

export default StatBox;
