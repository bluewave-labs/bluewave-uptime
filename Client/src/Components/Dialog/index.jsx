import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { GenericDialog } from "./genericDialog";
const Dialog = ({
	modelTitle,
	modelDescription,
	open,
	onClose,
	title,
	confirmationBtnLbl,
	confirmationBtnOnClick,
	cancelBtnLbl,
	cancelBtnOnClick,
	theme,
	isLoading,
	description,
}) => {
	return (
		<GenericDialog
			title={modelTitle}
			description={modelDescription}
			open={open}
			close={onClose}
			theme={theme}
		>
			<Typography
				id={modelTitle}
				component="h2"
				fontSize={16}
				color={theme.palette.text.primary}
				fontWeight={600}
			>
				{title}
			</Typography>
			{description && (
				<Typography
					id={modelDescription}
					color={theme.palette.text.tertiary}
				>
					{description}
				</Typography>
			)}
			<Stack
				direction="row"
				gap={theme.spacing(4)}
				mt={theme.spacing(12)}
				justifyContent="flex-end"
			>
				<Button
					variant="text"
					color="info"
					onClick={cancelBtnOnClick}
				>
					{cancelBtnLbl}
				</Button>
				<LoadingButton
					variant="contained"
					color="error"
					loading={isLoading}
					onClick={confirmationBtnOnClick}
				>
					{confirmationBtnLbl}
				</LoadingButton>
			</Stack>
		</GenericDialog>
	);
};

Dialog.propTypes = {
	modelTitle: PropTypes.string.isRequired,
	modelDescription: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	confirmationBtnLbl: PropTypes.string.isRequired,
	confirmationBtnOnClick: PropTypes.func.isRequired,
	cancelBtnLbl: PropTypes.string.isRequired,
	cancelBtnOnClick: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	description: PropTypes.string,
};

export default Dialog;
