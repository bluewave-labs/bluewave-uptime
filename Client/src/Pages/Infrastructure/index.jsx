import {
	Box,
	Button,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	// TablePagination,
	// Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import Greeting from "../../Utils/greeting";
import GearIcon from "../../Assets/icons/settings-bold.svg?react";
import CPUChipIcon from "../../Assets/icons/cpu-chip.svg?react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { StatusLabel } from "../../Components/Label";
import { Heading } from "../../Components/Heading";
import { Gauge } from "../../Components/Charts/Gauge";
import { getInfrastructureMonitorsByTeamId } from "../../Features/InfrastructureMonitors/infrastructureMonitorsSlice";
import useUtils from "../Monitors/utils";
import { Pagination } from "./components/TablePagination";

// const ROWS = Array.from(Array(20).keys()).map(() => mockedData);

const columns = [
	{ label: "Host" },
	{ label: "Status" },
	{ label: "Frequency" },
	{ label: "CPU" },
	{ label: "Mem" },
	{ label: "Disk" },
	{ label: "Actions" },
];

/* TODO 
Create reusable table component.
It should receive as a parameter the following object:
tableData = [
	 columns = [
		{
	 		id: example,
			label: Example Extendable,
			align: "center" | "left" (default)	
		}
	 ],
	 rows: [
	 	{
	 		**Number of keys will be equal to number of columns**
	 		key1: string,
			key2: number,
			key3: Component
		}
	 ]
]
Apply to Monitor Table, and Account/Team.
Analyze existing BasicTable
*/

/**
 * This is the Infrastructure monitoring page. This is a work in progress
 *
 * @param  - Define params.
 * @returns {JSX.Element} The infrastructure monitoring page.
 */

function Infrastructure(/* {isAdmin} */) {
	const theme = useTheme();
	const { determineState } = useUtils();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { authToken } = useSelector((state) => state.auth);
	const { isLoading, monitorsSummary, msg, success, ...rest } = useSelector(
		(state) => state.infrastructureMonitors
	);

	const { monitorCounts = {}, monitors = [] } = monitorsSummary;
	const { total: totalMonitors = 0 } = monitorCounts;
	console.log({ monitors });
	const monitorsAsRows = monitors.map((monitor) => ({
		ip: monitor.name,
		status: determineState(monitor),
		processor: "2Ghz" /* How to retrieve that?  */,
		cpu: 80 /* How to retrieve that?  */,
		mem: 50 /* How to retrieve that?  */,
		disk: 70 /* How to retrieve that?  */,
	}));

	useEffect(() => {
		dispatch(getInfrastructureMonitorsByTeamId(authToken));
	}, [authToken]);
	// console.log({ isLoading, monitorsSummary, msg, success, rest });

	return (
		<Stack
			component="main"
			style={{ width: "100%", gap: "1rem" }}
		>
			<Breadcrumbs list={[{ name: `infrastructure`, path: "/infrastructure" }]} />
			<Stack
				direction="row"
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
					gap: "1rem",
					flexWrap: "wrap",
					marginBottom: "3rem",
				}}
			>
				<Box style={{ maxWidth: "65ch" }}>
					<Greeting type="uptime" />
				</Box>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						navigate("/infrastructure/create");
					}}
					sx={{ fontWeight: 500 }}
				>
					Create infrastructure monitor
				</Button>
			</Stack>
			<Stack
				sx={{
					gap: "1rem",
				}}
			>
				<Stack
					direction="row"
					sx={{
						alignItems: "center",
						gap: ".25rem",
						flexWrap: "wrap",
					}}
				>
					<Heading component="h2">Infrastructure monitors</Heading>
					{/* TODO Correct the class current-monitors-counter, there are some unnecessary things there	 */}
					<Box
						component="span"
						className="current-monitors-counter"
						color={theme.palette.text.primary}
						border={1}
						borderColor={theme.palette.border.light}
						backgroundColor={theme.palette.background.accent}
					>
						{totalMonitors}
					</Box>
				</Stack>
				<TableContainer
					component={Paper}
					sx={{
						maxHeight: "55vh",
						"&::-webkit-scrollbar": {
							width: ".75rem",
						},
						"&::-webkit-scrollbar-track": {
							backgroundColor: theme.palette.secondary.light,
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: theme.palette.secondary.contrastText,
							outline: `1px solid ${theme.palette.secondary.contrastText}`,
						},
					}}
				>
					<Table stickyHeader>
						<TableHead sx={{ backgroundColor: theme.palette.background.accent }}>
							<TableRow>
								{columns.map((column, index) => (
									<TableCell
										key={index}
										align={index === 0 ? "left" : "center"}
										sx={{
											backgroundColor: theme.palette.background.accent,
										}}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{
								/* ROWS */ monitorsAsRows.map((row, index) => (
									<TableRow key={index}>
										{/* TODO iterate over column and get column id, applying row[column.id] */}
										<TableCell>{row.ip}</TableCell>
										<TableCell align="center">
											<StatusLabel
												status={row.status}
												text={row.status}
												/* Use capitalize inside of Status Label */
												/* Update component so we don't need to pass text and status separately*/
												customStyles={{ textTransform: "capitalize" }}
											/>
										</TableCell>
										<TableCell align="center">
											<Stack
												direction={"row"}
												justifyContent={"center"}
												alignItems={"center"}
												gap=".25rem"
											>
												<CPUChipIcon
													width={20}
													height={20}
												/>
												{row.processor}
											</Stack>
										</TableCell>
										<TableCell align="center">
											<Gauge
												progressValue={row.cpu}
												containerWidth={60}
											/>
										</TableCell>
										<TableCell align="center">
											<Gauge
												progressValue={row.mem}
												containerWidth={60}
											/>
										</TableCell>
										<TableCell align="center">
											<Gauge
												progressValue={row.disk}
												containerWidth={60}
											/>
										</TableCell>
										<TableCell align="center">
											{/* Get ActionsMenu from Monitor Table and create a component */}
											<IconButton
												sx={{
													"& svg path": {
														stroke: theme.palette.other.icon,
													},
												}}
											>
												<GearIcon
													width={20}
													height={20}
												/>
											</IconButton>
										</TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
				{/* 
				  TODO continue creating pagination component. It should change the current page, which will trigger refetch? 
				
				*/}
				{/* <Pagination
					// monitorCount={totalMonitors}
					page={0}
				/> */}
			</Stack>
		</Stack>
	);
}

export { Infrastructure };
