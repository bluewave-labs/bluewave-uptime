import { Stack, styled } from "@mui/material";

export const ConfigBox = styled(Stack)(({ theme }) => ({
	border: 1,
	borderStyle: "solid",
	borderColor: theme.palette.border.light,
	borderRadius: theme.spacing(2),
	backgroundColor: theme.palette.background.main,
	"& > *": { padding: theme.spacing(14) },
	"& > :first-of-type, & > .MuiStack-root > div:first-of-type": {
		flex: 0.6,
	},
	"& > div:last-of-type, & > .MuiStack-root > div:last-of-type": {
		flex: 1,
	},
	"& > .MuiStack-root > div:first-of-type": { paddingRight: theme.spacing(14) },
	"& > .MuiStack-root > div:last-of-type": {
		paddingLeft: theme.spacing(14),
	},
	"& h2": { fontSize: 13.5, fontWeight: 500 },
	"& h3, & p": {
		color: theme.palette.text.tertiary,
	},
	"& h3": { fontWeight: 500 },
}));
