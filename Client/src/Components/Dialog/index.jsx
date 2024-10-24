import PropTypes from "prop-types";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Stack } from "@mui/material";
import { GenericDialog } from "./genericDialog";

const Dialog = ({
	title,
	description,
	open,
	theme,
	onCancel,
	confirmationButtonLabel,
	onConfirm,
	isLoading,
}) => {
	return (
		<GenericDialog
			title={title}
			description={description}
			open={open}
			onClose={onCancel}
			theme={theme}
		>
			<Stack
				direction="row"
				gap={theme.spacing(4)}
				mt={theme.spacing(12)}
				justifyContent="flex-end"
			>
				<Button
					variant="text"
					color="info"
					onClick={onCancel}
				>
					Cancel
				</Button>
				<LoadingButton
					variant="contained"
					color="error"
					loading={isLoading}
					onClick={onConfirm}
				>
					{confirmationButtonLabel}
				</LoadingButton>
			</Stack>
		</GenericDialog>
	);
};

Dialog.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired,
	onCancel: PropTypes.func.isRequired,
	confirmationButtonLabel: PropTypes.string.isRequired,
	onConfirm: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default Dialog;
