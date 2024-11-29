/* TODO I basically copied and pasted this component from the actionsMenu. Check how we can make it reusable */

import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../../../Utils/toastUtils";
/* import { logger } from "../../../Utils/Logger"; */
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
	deleteUptimeMonitor,
	/* 	pauseUptimeMonitor, */
	getUptimeMonitorsByTeamId,
} from "../../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import Settings from "../../../../assets/icons/settings-bold.svg?react";
import PropTypes from "prop-types";
import Dialog from "../../../../Components/Dialog";
import { networkService } from "../../../../Utils/NetworkService.js";

const InfrastructureMenu = ({ monitor, isAdmin, updateCallback }) => {
	/* const [anchorEl, setAnchorEl] = useState(null);
	const [actions, setActions] = useState({}); */
	const actions = { id: monitor.id, url: monitor.url };
	const anchor = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const dispatch = useDispatch();
	const theme = useTheme();
	const authState = useSelector((state) => state.auth);
	const authToken = authState.authToken;
	const { isLoading } = useSelector((state) => state.uptimeMonitors);

	/* const handlePause = async () => {
		try {
			const action = await dispatch(
				pauseUptimeMonitor({ authToken, monitorId: monitor._id })
			);
			if (pauseUptimeMonitor.fulfilled.match(action)) {
				updateCallback();
				const state = action?.payload?.data.isActive === false ? "paused" : "resumed";
				createToast({ body: `Monitor ${state} successfully.` });
			} else {
				throw new Error(action?.error?.message ?? "Failed to pause monitor.");
			}
		} catch (error) {
			logger.error("Error pausing monitor:", monitor._id, error);
			createToast({ body: "Failed to pause monitor." });
		}
	}; */

	/* TODO 
1) Clean component
2) Rerender after removing
3) Add padding to inputs (I took of their height)
 */

	const openMenu = (e) => {
		e.stopPropagation();
		setIsOpen(true);
	};

	const closeMenu = (e) => {
		e.stopPropagation();
		setIsOpen(false);
	};

	const openRemove = (e) => {
		closeMenu(e);
		setIsDialogOpen(true);
	};
	const cancelRemove = () => {
		setIsDialogOpen(false);
	};

	const navigate = useNavigate();

	function openDetails(id) {
		navigate(`/infrastructure/${id}`);
	}

	const handleRemove = async () => {
		try {
			/* TODO not working, dont know why */
			const result = await networkService.deleteMonitorById({
				authToken,
				monitorId: actions.id,
			});
			console.log(result);
			/* Toast success */
		} catch (error) {
			console.log(error);
			/* Toast error */
		} finally {
			setIsDialogOpen(false);
			updateCallback();
		}
		/* let monitor = { _id: actions.id };
		const action = await dispatch(
			deleteUptimeMonitor({ authToken: authState.authToken, monitor })
		);
		if (action.meta.requestStatus === "fulfilled") {
			setIsOpen(false); // close modal
			dispatch(getUptimeMonitorsByTeamId(authState.authToken));
			updateCallback();
			createToast({ body: "Monitor deleted successfully." });
		} else {
			createToast({ body: "Failed to delete monitor." });
		} */
	};

	return (
		<>
			<IconButton
				aria-label="monitor actions"
				onClick={openMenu}
				sx={{
					"&:focus": {
						outline: "none",
					},
					"& svg path": {
						stroke: theme.palette.other.icon,
					},
				}}
				ref={anchor}
			>
				<Settings />
			</IconButton>

			<Menu
				className="actions-menu"
				anchorEl={anchor.current}
				open={isOpen}
				onClose={closeMenu}
				disableScrollLock
				slotProps={{
					paper: {
						sx: {
							"& ul": { p: theme.spacing(2.5) },
							"& li": { m: 0 },
							"& li:last-of-type": {
								color: theme.palette.error.contrastText,
							},
						},
					},
				}}
			>
				{/*
        Open sit action. Not necessary for infrastructure?

        {actions.url !== null ? (
					<MenuItem
						onClick={(e) => {
							closeMenu(e);
							e.stopPropagation();
							window.open(actions.url, "_blank", "noreferrer");
						}}
					>
						Open site
					</MenuItem>
				) : (
					""
				)} 
         */}
				<MenuItem onClick={() => openDetails(actions.id)}>Details</MenuItem>
				{/* TODO - pass monitor id to Incidents page */}
				{/* <MenuItem
					onClick={(e) => {
						e.stopPropagation();
						navigate(`/incidents/${actions.id}`);
					}}
				>
					Incidents
				</MenuItem> */}
				{/* {isAdmin && (
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();

							navigate(`/monitors/configure/${actions.id}`);
						}}
					>
						Configure
					</MenuItem>
				)} */}
				{/* {isAdmin && (
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/monitors/create/${actions.id}`);
						}}
					>
						Clone
					</MenuItem>
				)} */}
				{/* {isAdmin && (
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();
							handlePause(e);
						}}
					>
						{monitor?.isActive === true ? "Pause" : "Resume"}
					</MenuItem>
				)} */}
				{isAdmin && <MenuItem onClick={openRemove}>Remove</MenuItem>}
			</Menu>
			<Dialog
				open={isDialogOpen}
				theme={theme}
				title="Do you really want to delete this monitor?"
				description="Once deleted, this monitor cannot be retrieved."
				onCancel={cancelRemove}
				confirmationButtonLabel="Delete"
				/* Do we need stop propagation? */
				onConfirm={handleRemove}
				isLoading={isLoading}
				modelTitle="modal-delete-monitor"
				modelDescription="delete-monitor-confirmation"
			/>
		</>
	);
};

InfrastructureMenu.propTypes = {
	monitor: PropTypes.shape({
		_id: PropTypes.string,
		url: PropTypes.string,
		type: PropTypes.string,
		isActive: PropTypes.bool,
	}).isRequired,
	isAdmin: PropTypes.bool,
	updateCallback: PropTypes.func,
};

export { InfrastructureMenu };
