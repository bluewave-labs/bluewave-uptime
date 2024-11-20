import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import { Stack, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CustomGauge from "../../../Components/Charts/CustomGauge";
import AreaChart from "../../../Components/Charts/AreaChart";
import { useSelector } from "react-redux";
import { networkService } from "../../../main";
import axios from "axios";
import {
	TzTick,
	PercentTick,
	InfrastructureTooltip,
} from "../../../Components/Charts/Utils/chartUtils";
import PropTypes from "prop-types";

/**
 * Converts bytes to gigabytes
 * @param {number} bytes - Number of bytes to convert
 * @returns {number} Converted value in gigabytes
 */
const formatBytes = (bytes) => {
	if (typeof bytes !== "number") return "0 GB";
	if (bytes === 0) return "0 GB";

	const GB = bytes / (1024 * 1024 * 1024);
	const MB = bytes / (1024 * 1024);

	if (GB >= 1) {
		return `${Number(GB.toFixed(0))} GB`;
	} else {
		return `${Number(MB.toFixed(0))} MB`;
	}
};

/**
 * Renders a base box with consistent styling
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to render inside the box
 * @returns {React.ReactElement} Styled box component
 */
const BaseBox = ({ children }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				height: "100%",
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

BaseBox.propTypes = {
	children: PropTypes.node.isRequired,
};

/**
 * Renders a statistic box with a heading and subheading
 * @param {Object} props - Component properties
 * @param {string} props.heading - Primary heading text
 * @param {string} props.subHeading - Secondary heading text
 * @returns {React.ReactElement} Stat box component
 */
const StatBox = ({ heading, subHeading }) => {
	return (
		<BaseBox>
			<Typography component="h2">{heading}</Typography>
			<Typography>{subHeading}</Typography>
		</BaseBox>
	);
};

StatBox.propTypes = {
	heading: PropTypes.string.isRequired,
	subHeading: PropTypes.string.isRequired,
};

/**
 * Renders a gauge box with usage visualization
 * @param {Object} props - Component properties
 * @param {number} props.value - Percentage value for gauge
 * @param {string} props.heading - Box heading
 * @param {string} props.metricOne - First metric label
 * @param {string} props.valueOne - First metric value
 * @param {string} props.metricTwo - Second metric label
 * @param {string} props.valueTwo - Second metric value
 * @returns {React.ReactElement} Gauge box component
 */
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

GaugeBox.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	heading: PropTypes.string.isRequired,
	metricOne: PropTypes.string.isRequired,
	valueOne: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	metricTwo: PropTypes.string.isRequired,
	valueTwo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

/**
 * Renders the infrastructure details page
 * @returns {React.ReactElement} Infrastructure details page component
 */
const InfrastructureDetails = () => {
	const theme = useTheme();
	const { monitorId } = useParams();
	const navList = [
		{ name: "infrastructure monitors", path: "/infrastructure" },
		{ name: "details", path: `/infrastructure/${monitorId}` },
	];
	const [monitor, setMonitor] = useState(null);
	const { authToken } = useSelector((state) => state.auth);
	const [dateRange, setDateRange] = useState("day");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await networkService.getStatsByMonitorId({
					authToken: authToken,
					monitorId: monitorId,
					sortOrder: null,
					limit: null,
					dateRange: dateRange,
					numToDisplay: 50,
					normalize: true,
				});
				setMonitor(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	return (
		monitor && (
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
							subHeading={`${monitor.checks[0].cpu.physical_core} cores`}
						/>
						<StatBox
							heading={"Memory"}
							subHeading={formatBytes(monitor.checks[0].memory.total_bytes)}
						/>
						<StatBox
							heading={"Disk"}
							subHeading={formatBytes(monitor.checks[0].disk[0].total_bytes)}
						/>
						<StatBox
							heading={"Uptime"}
							subHeading={"100%"}
						/>
						<StatBox
							heading={"Status"}
							subHeading={monitor.status === true ? "Active" : "Inactive"}
						/>
					</Stack>
					<Stack
						direction="row"
						gap={theme.spacing(8)}
					>
						<GaugeBox
							value={monitor.checks[0].memory.usage_percent * 100}
							heading={"Memory Usage"}
							metricOne={"Used"}
							valueOne={formatBytes(monitor.checks[0].memory.used_bytes)}
							metricTwo={"Total"}
							valueTwo={formatBytes(monitor.checks[0].memory.total_bytes)}
						/>
						<GaugeBox
							value={monitor.checks[0].cpu.usage_percent * 100}
							heading={"CPU Usage"}
							metricOne={"Cores"}
							valueOne={monitor.checks[0].cpu.physical_core}
							metricTwo={"Frequency"}
							valueTwo={`${(monitor.checks[0].cpu.frequency / 1000).toFixed(2)} Ghz`}
						/>
						{monitor.checks[0].disk.map((disk, idx) => {
							return (
								<GaugeBox
									key={disk._id}
									value={disk.usage_percent * 100}
									heading={`Disk${idx} usage`}
									metricOne={"Used"}
									valueOne={formatBytes(disk.total_bytes - disk.free_bytes)}
									metricTwo={"Total"}
									valueTwo={formatBytes(disk.total_bytes)}
								/>
							);
						})}
					</Stack>
					<Stack
						direction={"row"}
						height={300} // FE team HELP!
						gap={theme.spacing(8)} // FE team HELP!
						flexWrap="wrap" // //FE team HELP! Better way to do this?
						sx={{
							"& > *": {
								flexBasis: `calc(50% - ${theme.spacing(8)})`,
								maxWidth: `calc(50% - ${theme.spacing(8)})`,
							},
						}}
					>
						<BaseBox>
							<Typography
								component="h2"
								padding={theme.spacing(8)}
							>
								Memory usage
							</Typography>
							<AreaChart
								data={monitor?.checks ?? []}
								dataKey="memory.usage_percent"
								xKey="createdAt"
								yKey="memory.usage_percent"
								customTooltip={({ active, payload, label }) => (
									<InfrastructureTooltip
										label={label}
										yKey="memory.usage_percent"
										yLabel="Memory Usage"
										active={active}
										payload={payload}
									/>
								)}
								xTick={<TzTick />}
								yTick={<PercentTick />}
								strokeColor={theme.palette.primary.main}
								gradient={true}
								gradientStartColor={theme.palette.primary.main} //FE team HELP!  Not sure what colors to use
								gradientEndColor="#ffffff" // FE team HELP!
							/>
						</BaseBox>
						<BaseBox>
							<Typography
								component="h2"
								padding={theme.spacing(8)}
							>
								CPU usage
							</Typography>
							<AreaChart
								data={monitor?.checks ?? []}
								dataKey="cpu.usage_percent"
								xKey="createdAt"
								yKey="cpu.usage_percent"
								customTooltip={({ active, payload, label }) => (
									<InfrastructureTooltip
										label={label}
										yKey="cpu.usage_percent"
										yLabel="CPU Usage"
										active={active}
										payload={payload}
									/>
								)}
								xTick={<TzTick />}
								yTick={<PercentTick />}
								strokeColor={theme.palette.success.main} // FE team HELP!
								gradient={true}
								fill={theme.palette.success.main} // FE team HELP!
								gradientStartColor={theme.palette.success.main}
								gradientEndColor="#ffffff"
							/>
						</BaseBox>
						{monitor?.checks?.[0]?.disk?.map((disk, idx) => {
							// disk is an array of disks, so we need to map over it
							return (
								<BaseBox key={disk._id}>
									<Typography
										component="h2"
										padding={theme.spacing(8)}
									>
										{`Disk${idx} usage`}
									</Typography>
									<AreaChart
										data={monitor?.checks ?? []}
										dataKey={`disk[${idx}].usage_percent`}
										xKey="createdAt"
										yKey={`disk[${idx}].usage_percent`} // We are looking for the usage_percent of the current disk in the array
										customTooltip={({ active, payload, label }) => (
											<InfrastructureTooltip
												label={label} // label must be a string
												yKey={`disk.usage_percent`}
												yLabel="Disk Usage"
												yIdx={idx}
												active={active}
												payload={payload}
											/>
										)}
										xTick={<TzTick />}
										yTick={<PercentTick />}
										strokeColor={theme.palette.warning.main}
										gradient={true}
										gradientStartColor={theme.palette.warning.main}
										gradientEndColor="#ffffff"
									/>
								</BaseBox>
							);
						})}
					</Stack>
				</Stack>
			</Box>
		)
	);
};

export default InfrastructureDetails;
