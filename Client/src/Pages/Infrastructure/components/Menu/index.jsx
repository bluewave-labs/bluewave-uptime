/* TODO I basically copied and pasted this component from the actionsMenu. Check how we can make it reusable */

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../../../Utils/toastUtils";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Settings from "../../../../assets/icons/settings-bold.svg?react";
import PropTypes from "prop-types";
import Dialog from "../../../../Components/Dialog";
import { networkService } from "../../../../Utils/NetworkService.js";

/**
 * InfrastructureMenu Component
 * Provides a dropdown menu for managing infrastructure monitors.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.monitor - The monitor object containing details about the infrastructure monitor.
 * @param {string} props.monitor.id - Unique ID of the monitor.
 * @param {string} [props.monitor.url] - URL associated with the monitor.
 * @param {string} props.monitor.type - Type of monitor (e.g., uptime, infrastructure).
 * @param {boolean} props.monitor.isActive - Indicates if the monitor is currently active.
 * @param {boolean} props.isAdmin - Whether the user has admin privileges.
 * @param {Function} props.updateCallback - Callback to trigger when the monitor data is updated.
 * @returns {JSX.Element} The rendered component.
 */
const InfrastructureMenu = ({ monitor, isAdmin, updateCallback }) => {
	const anchor = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const theme = useTheme();
	const authState = useSelector((state) => state.auth);
	const authToken = authState.authToken;
	const { isLoading } = useSelector((state) => state.uptimeMonitors);

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
			await networkService.deleteMonitorById({
				authToken,
				monitorId: monitor.id,
			});
			createToast({ body: "Monitor deleted successfully." });
		} catch (error) {
			createToast({ body: "Failed to delete monitor." });
		} finally {
			setIsDialogOpen(false);
			updateCallback();
		}
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
								color: theme.palette.error.main,
							},
						},
					},
				}}
			>
				{/*
        Open site action. Not necessary for infrastructure?

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
				<MenuItem onClick={() => openDetails(monitor.id)}>Details</MenuItem>
				{/* 
        Incidents. Necessary?
        <MenuItem
					onClick={(e) => {
						e.stopPropagation();
						navigate(`/incidents/${actions.id}`);
					}}
				>
					Incidents
				</MenuItem> */}
				{/* 
        Configure. Necessary?
        {isAdmin && (
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();

							navigate(`/monitors/configure/${actions.id}`);
						}}
					>
						Configure
					</MenuItem>
				)} */}
				{/* 
        Clone. Necessary?
        {isAdmin && (
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/monitors/create/${actions.id}`);
						}}
					>
						Clone
					</MenuItem>
				)} */}
				{/* 
        Pause. Necessary?
      const handlePause = async () => {
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
	};
        {isAdmin && (
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
		id: PropTypes.string,
		url: PropTypes.string,
		type: PropTypes.string,
		isActive: PropTypes.bool,
	}).isRequired,
	isAdmin: PropTypes.bool,
	updateCallback: PropTypes.func,
};

export { InfrastructureMenu };
