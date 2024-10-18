import "./index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUptimeMonitorsByTeamId } from "../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SkeletonLayout from "./skeleton";
import Fallback from "./fallback";
import StatusBox from "./StatusBox";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import Greeting from "../../../Utils/greeting";
import MonitorTable from "./MonitorTable";
import Search from "../../../Components/Inputs/Search";
import useDebounce from "../../../Utils/debounce";

const Monitors = ({ isAdmin }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const monitorState = useSelector((state) => state.uptimeMonitors);
	const authState = useSelector((state) => state.auth);
	const dispatch = useDispatch({});

	//TODO create components, and lower these states.
	const [search, setSearch] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const debouncedFilter = useDebounce(search, 500);

	const handleSearch = (value) => {
		setIsSearching(true);
		setSearch(value);
	};

	useEffect(() => {
		dispatch(getUptimeMonitorsByTeamId(authState.authToken));
	}, [authState.authToken, dispatch]);

	//Why are we tying loading to monitors length?
	const loading =
		monitorState?.isLoading; /* && monitorState?.monitorsSummary?.monitors?.length === 0 */

	const hasMonitors = monitorState?.monitorsSummary?.monitors?.length !== 0;
	const noMonitors = monitorState?.monitorsSummary?.monitors?.length === 0;
	const canAddMonitor = isAdmin && hasMonitors;
	const needsAdmin = !isAdmin && noMonitors;

	/* console.log({ loading });
	console.log({ monitorState }); */
	return (
		<Stack
			className="monitors"
			gap={theme.spacing(8)}
		>
			<Box>
				<Breadcrumbs list={[{ name: `monitors`, path: "/monitors" }]} />
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					mt={theme.spacing(5)}
					gap={theme.spacing(6)}
				>
					<Greeting type="uptime" />
					{canAddMonitor && (
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								navigate("/monitors/create");
							}}
							sx={{ fontWeight: 500 }}
						>
							Create monitor
						</Button>
					)}
				</Stack>
			</Box>
			{noMonitors && <Fallback isAdmin={isAdmin} />}
			{needsAdmin && <p>Wait for an admin to add some monitors!</p>}
			{loading ? (
				<SkeletonLayout />
			) : (
				<>
					{hasMonitors && (
						<>
							<Stack
								gap={theme.spacing(8)}
								direction="row"
								justifyContent="space-between"
							>
								<StatusBox
									title="up"
									value={monitorState?.monitorsSummary?.monitorCounts?.up ?? 0}
								/>
								<StatusBox
									title="down"
									value={monitorState?.monitorsSummary?.monitorCounts?.down ?? 0}
								/>
								<StatusBox
									title="paused"
									value={monitorState?.monitorsSummary?.monitorCounts?.paused ?? 0}
								/>
							</Stack>
							<Box
								flex={1}
								px={theme.spacing(10)}
								py={theme.spacing(8)}
								border={1}
								borderColor={theme.palette.border.light}
								borderRadius={theme.shape.borderRadius}
								backgroundColor={theme.palette.background.main}
							>
								<Stack
									direction="row"
									alignItems="center"
									mb={theme.spacing(8)}
								>
									<Typography
										component="h2"
										variant="h2"
										fontWeight={500}
										letterSpacing={-0.2}
									>
										Actively monitoring
									</Typography>
									<Box
										className="current-monitors-counter"
										color={theme.palette.text.primary}
										border={1}
										borderColor={theme.palette.border.light}
										backgroundColor={theme.palette.background.accent}
									>
										{/* TODO maybe we dont need the conditional here, since we already check for monitors before */}
										{monitorState?.monitorsSummary?.monitorCounts?.total || 0}
									</Box>
									<Box
										width="25%"
										minWidth={150}
										ml="auto"
									>
										<Search
											options={monitorState?.monitorsSummary?.monitors ?? []}
											filteredBy="name"
											inputValue={search}
											handleInputChange={handleSearch}
										/>
									</Box>
								</Stack>
								<Box position="relative">
									{isSearching && (
										<>
											<Box
												width="100%"
												height="100%"
												position="absolute"
												sx={{
													backgroundColor: theme.palette.background.main,
													opacity: 0.8,
													zIndex: 100,
												}}
											/>
											<Box
												height="100%"
												position="absolute"
												top="20%"
												left="50%"
												sx={{
													transform: "translateX(-50%)",
													zIndex: 101,
												}}
											>
												<CircularProgress
													sx={{
														color: theme.palette.other.icon,
													}}
												/>
											</Box>
										</>
									)}
									<MonitorTable
										isAdmin={isAdmin}
										filter={debouncedFilter}
										setLoading={setIsSearching}
									/>
								</Box>
							</Box>
						</>
					)}
				</>
			)}
		</Stack>
	);
};

Monitors.propTypes = {
	isAdmin: PropTypes.bool,
};
export default Monitors;
