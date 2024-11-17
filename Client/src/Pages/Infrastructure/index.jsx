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
import { Heading } from "../../Components/Heading";
import { useTheme } from "@emotion/react";
import Greeting from "../../Utils/greeting";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { StatusLabel } from "../../Components/Label";
import { Gauge } from "../../Components/Charts/Gauge";
import GearIcon from "../../Assets/icons/settings-bold.svg?react";
import CPUChipIcon from "../../Assets/icons/cpu-chip.svg?react";

const mockedData = {
	ip: "https://192.168.1.30",
	status: "up",
	processor: "2Ghz",
	cpu: 80,
	mem: 50,
	disk: 70,
};

const ROWS = Array.from(Array(20).keys()).map(() => mockedData);
console.log(ROWS);

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

function Infrastructure() {
	const theme = useTheme();
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
						// navigate("/monitors/create");
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
						5
					</Box>
				</Stack>
				<TableContainer
					component={Paper}
					sx={{ maxHeight: "55vh" }}
				>
					<Table stickyHeader>
						<TableHead sx={{ backgroundColor: theme.palette.background.accent }}>
							<TableRow>
								{columns.map((column, index) => (
									<TableCell
										key={index}
										align={index === 0 ? "left" : "center"}
										/* TODO I don't understand why it was needed to pass this to override some #ffffff color from MUI here, but that wasn't needed in other pages.  */
										sx={{ backgroundColor: "transparent" }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{ROWS.map((row, index) => (
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
							))}
						</TableBody>
					</Table>
				</TableContainer>
				{/* <Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					marginTop={8}
				>
					<Typography
						// px={theme.spacing(2)}
						variant="body2"
						// sx={{ opacity: 0.7 }}
					>
						Showing {getRange()} of {monitorCount} monitor(s)
					</Typography>
					<TablePagination
						component="div"
						count={monitorCount}
						page={page}
						onPageChange={handleChangePage}
						rowsPerPage={rowsPerPage}
						rowsPerPageOptions={[5, 10, 15, 25]}
						onRowsPerPageChange={handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
						labelRowsPerPage="Rows per page"
						labelDisplayedRows={({ page, count }) =>
							`Page ${page + 1} of ${Math.max(0, Math.ceil(count / rowsPerPage))}`
						}
						slotProps={{
							select: {
								MenuProps: {
									keepMounted: true,
									disableScrollLock: true,
									PaperProps: {
										className: "pagination-dropdown",
										sx: {
											mt: 0,
											mb: theme.spacing(2),
										},
									},
									transformOrigin: { vertical: "bottom", horizontal: "left" },
									anchorOrigin: { vertical: "top", horizontal: "left" },
									sx: {
										mt: theme.spacing(-2),
									},
								},
								inputProps: { id: "pagination-dropdown" },
								IconComponent: SelectorVertical,
								sx: {
									ml: theme.spacing(4),
									mr: theme.spacing(12),
									minWidth: theme.spacing(20),
									textAlign: "left",
									"&.Mui-focused > div": {
										backgroundColor: theme.palette.background.main,
									},
								},
							},
						}}
						sx={{
							color: theme.palette.text.secondary,
							"& svg path": {
								stroke: theme.palette.text.tertiary,
								strokeWidth: 1.3,
							},
							"& .MuiSelect-select": {
								border: 1,
								borderColor: theme.palette.border.light,
								borderRadius: theme.shape.borderRadius,
							},
						}}
					/>
				</Stack> */}
			</Stack>
		</Stack>
	);
}

export { Infrastructure };
