import {
	Box,
	Button,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import { Heading } from "../../Components/Heading";
import { useTheme } from "@emotion/react";
import Greeting from "../../Utils/greeting";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { StatusLabel } from "../../Components/Label";
import { Gauge } from "../../Components/Charts/Gauge";

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
	{
		label: "Host",
		/*  id: "name", */
		/*  minWidth: 170 */
	},
	{
		/* id: "code", */
		label: "Status",
		/* minWidth: 100  */
	},
	{
		/* id: "population", */
		label: "Frequency",
		/* minWidth: 170,
		align: "right", */
		/* format: (value) => value.toLocaleString("en-US"), */
	},
	{
		/* id: "size", */
		label: "CPU",
		/* 	minWidth: 170, */
		/* align: "right", */
		/* format: (value) => value.toLocaleString("en-US"), */
	},
	{
		/* id: "density", */
		label: "Mem",
		/* 	minWidth: 170, */
		/* 		align: "right",
		format: (value) => value.toFixed(2), */
	},
	{
		label: "Disk",
	},
	{
		label: "Actions",
	},
];

/* TODO steps

1) Extract Client\src\Pages\Monitors\Home\MonitorTable\index.jsx to reusable component

...
z) Check error pointed by Shemy on theme
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
				/* spacing={8} */
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
					/* spacing={8} */
					sx={{
						alignItems: "center",
						gap: ".25rem",
						flexWrap: "wrap",
					}}
				>
					<Heading component="h2">Infrastructure monitors</Heading>
					{/* TODO Correct the class, messy stuff	 */}
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
				<TableContainer>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								{columns.map((column, index) => (
									<TableCell
										key={index}
										/* align={column.align} */
										/* style={{ minWidth: column.minWidth }} */
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
									<TableCell>
										<StatusLabel
											status={row.status}
											text={row.status}
											/* Usar o capitalize dentro do Status Label */
											/* Fazer nao precisar mais passar o text*/
											customStyles={{ textTransform: "capitalize" }}
										/>
									</TableCell>
									<TableCell>{row.processor}</TableCell>
									<TableCell>
										<Gauge
											progressValue={row.cpu}
											containerWidth={60}
											/* displayText={row.cpu}
											containerHeight={100}
											containerWidth={100} */
										/>
									</TableCell>
									<TableCell>
										<Gauge
											progressValue={row.mem}
											containerWidth={60}
										/>
									</TableCell>
									<TableCell>
										<Gauge
											progressValue={row.disk}
											containerWidth={60}
										/>
									</TableCell>
									<TableCell>actions</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination></TablePagination>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Stack>
		</Stack>
	);
}

export { Infrastructure };
