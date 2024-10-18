import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Modal, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
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
		<Modal
			aria-labelledby={modelTitle}
			aria-describedby={modelDescription}
			open={open}
			onClose={onClose}
		>
			<Stack
				gap={theme.spacing(2)}
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: theme.palette.background.main,
					border: 1,
					borderColor: theme.palette.border.light,
					borderRadius: theme.shape.borderRadius,
					boxShadow: 24,
					p: theme.spacing(15),
					"&:focus": {
						outline: "none",
					},
				}}
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
			</Stack>
		</Modal>
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
