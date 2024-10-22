import { Modal, Stack } from "@mui/material";
import PropTypes from "prop-types";
const GenericDialog = ({ title, description, open, onClose, theme, children }) => {
	return (
		<Modal
			aria-labelledby={title}
			aria-describedby={description}
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
				{children}
			</Stack>
		</Modal>
	);
};

GenericDialog.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
};

export { GenericDialog };
