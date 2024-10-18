import { Stack, styled } from "@mui/material";

export const ConfigBox = styled(Stack)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	gap: theme.spacing(20),
	paddingTop: theme.spacing(12),
	paddingInline: theme.spacing(15),
	paddingBottom: theme.spacing(25),
	backgroundColor: theme.palette.background.main,
	border: 1,
	borderStyle: "solid",
	borderColor: theme.palette.border.light,
	borderRadius: theme.spacing(2),
	"& > div:first-of-type": {
		flex: 0.7,
	},
	"& > div:last-of-type": {
		flex: 1,
	},
	"& h1, & h2": {
		color: theme.palette.text.secondary,
	},
	"& p": {
		color: theme.palette.text.tertiary,
	},
}));
