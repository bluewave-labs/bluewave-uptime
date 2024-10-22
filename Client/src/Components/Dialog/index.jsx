import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { GenericDialog } from "./genericDialog";
import { useId } from "react";
const Dialog = ({
	open,
	onClose,
	theme,
	title,
	description,
	onCancel,
	confirmationButtonLabel,
	onConfirm,
	isLoading,
}) => {
	const titleId = useId();
	const descriptionId = useId();
	return (
		<GenericDialog
			title={titleId}
			description={descriptionId}
			open={open}
			onClose={onClose}
			theme={theme}
		>
			<Typography
				id={titleId}
				component="h2"
				fontSize={16}
				color={theme.palette.text.primary}
				fontWeight={600}
			>
				{title}
			</Typography>
			{description && (
				<Typography
					id={descriptionId}
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
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	onCancel: PropTypes.func.isRequired,
	confirmationButtonLabel: PropTypes.string.isRequired,
	onConfirm: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default Dialog;
