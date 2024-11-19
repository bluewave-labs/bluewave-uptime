import { monitorData } from "./data";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import { Stack, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

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
			<div></div>
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
			</Stack>
		</Box>
	);
};

export default InfrastructureDetails;
