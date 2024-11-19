import { monitorData } from "./data";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import { Stack, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CustomGauge from "../../../Components/Charts/CustomGauge";

const bytesToGB = (bytes) => {
	if (typeof bytes !== "number") return 0;
	if (bytes === 0) return 0;
	const GB = bytes / (1024 * 1024 * 1024);
	return Number(GB.toFixed(0));
};

const BaseBox = ({ children }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				padding: `${theme.spacing(4)} ${theme.spacing(8)}`,
				minWidth: 200,
				width: 225,
				backgroundColor: theme.palette.background.main,
				border: 1,
				borderStyle: "solid",
				borderColor: theme.palette.border.light,
			}}
		>
			{children}
		</Box>
	);
};

const StatBox = ({ heading, subHeading }) => {
	return (
		<BaseBox>
			<Typography component="h2">{heading}</Typography>
			<Typography>{subHeading}</Typography>
		</BaseBox>
	);
};

const GaugeBox = ({ value, heading, metricOne, valueOne, metricTwo, valueTwo }) => {
	const theme = useTheme();
	return (
		<BaseBox>
			<Stack
				direction="column"
				gap={theme.spacing(2)}
				alignItems="center"
			>
				<CustomGauge
					progress={value}
					radius={100}
					color={theme.palette.primary.main}
				/>
				<Typography component="h2">{heading}</Typography>
				<Box
					sx={{
						width: "100%",
						borderTop: `1px solid ${theme.palette.border.light}`,
					}}
				>
					<Stack
						justifyContent={"space-between"}
						direction="row"
						gap={theme.spacing(2)}
					>
						<Typography>{metricOne}</Typography>
						<Typography>{valueOne}</Typography>
					</Stack>
					<Stack
						justifyContent={"space-between"}
						direction="row"
						gap={theme.spacing(2)}
					>
						<Typography>{metricTwo}</Typography>
						<Typography>{valueTwo}</Typography>
					</Stack>
				</Box>
			</Stack>
		</BaseBox>
	);
};

const InfrastructureDetails = () => {
	const theme = useTheme();
	const { monitorId } = useParams();
	const testData = monitorData;
	const latestCheck = testData[testData.length - 1];
	const navList = [
		{ name: "infrastructure monitors", path: "/infrastructure" },
		{ name: "details", path: `/infrastructure/${monitorId}` },
	];

	return (
		<Box>
			<Breadcrumbs list={navList} />
			<Stack
				direction="column"
				gap={theme.spacing(10)}
				mt={theme.spacing(10)}
			>
				<Stack
					direction="row"
					gap={theme.spacing(8)}
				>
					<StatBox
						heading={"CPU"}
						subHeading={`${latestCheck.cpu.physical_core} cores`}
					/>
					<StatBox
						heading={"Memory"}
						subHeading={`${bytesToGB(latestCheck.memory.total_bytes)}GB`}
					/>
					<StatBox
						heading={"Disk"}
						subHeading={`${bytesToGB(latestCheck.disk[0].total_bytes)}GB`}
					/>
					<StatBox
						heading={"Uptime"}
						subHeading={"100%"}
					/>
					<StatBox
						heading={"Status"}
						subHeading={"Active"}
					/>
				</Stack>
				<Stack
					direction="row"
					gap={theme.spacing(8)}
				>
					<GaugeBox
						value={latestCheck.cpu.usage_percent}
						heading={"Memory Usage"}
						metricOne={"Used"}
						valueOne={`${bytesToGB(latestCheck.memory.used_bytes)}GB`}
						metricTwo={"Total"}
						valueTwo={`${bytesToGB(latestCheck.memory.total_bytes)}GB`}
					/>
					<GaugeBox
						value={latestCheck.cpu.usage_percent}
						heading={"CPU Usage"}
						metricOne={"Cores"}
						valueOne={latestCheck.cpu.physical_core}
						metricTwo={"Frequency"}
						valueTwo={`${latestCheck.cpu.frequency} Ghz`}
					/>
					{latestCheck.disk.map((disk, idx) => {
						return (
							<GaugeBox
								key={disk._id}
								value={disk.usage_percent}
								heading={`Disk${idx} usage`}
								metricOne={"Used"}
								valueOne={`${bytesToGB(disk.total_bytes - disk.free_bytes)}GB`}
								metricTwo={"Total"}
								valueTwo={`${bytesToGB(disk.total_bytes)}GB`}
							/>
						);
					})}
				</Stack>
			</Stack>
		</Box>
	);
};

export default InfrastructureDetails;
