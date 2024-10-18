import { Box, styled } from "@mui/material";

export const IconBox = styled(Box)(({ theme }) => ({
	height: 48,
	minWidth: 48,
	width: 48,
	position: "relative",
	border: 1,
	borderStyle: "solid",
	borderColor: theme.palette.border.dark,
	borderRadius: 12,
	backgroundColor: theme.palette.background.accent,
	margin: "auto",
	marginBottom: 8,
	"& svg": {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 24,
		height: 24,
		"& path": {
			stroke: theme.palette.text.tertiary,
		},
	},
}));
