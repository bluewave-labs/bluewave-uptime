import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import { Stack, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CustomGauge from "../../../Components/Charts/CustomGauge";
import AreaChart from "../../../Components/Charts/AreaChart";
import { useSelector } from "react-redux";
import { networkService } from "../../../main";
import PulseDot from "../../../Components/Animated/PulseDot";
import useUtils from "../../Monitors/utils";
import { formatDurationRounded, formatDurationSplit } from "../../../Utils/timeUtils";
import {
	TzTick,
	PercentTick,
	InfrastructureTooltip,
} from "../../../Components/Charts/Utils/chartUtils";
import PropTypes from "prop-types";

const BASE_BOX_PADDING_VERTICAL = 4;
const BASE_BOX_PADDING_HORIZONTAL = 8;
const TYPOGRAPHY_PADDING = 8;
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
 * @param {Object} props.sx - Additional styling for the box
 * @returns {React.ReactElement} Styled box component
 */
const BaseBox = ({ children, sx = {} }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				height: "100%",
				padding: `${theme.spacing(BASE_BOX_PADDING_VERTICAL)} ${theme.spacing(BASE_BOX_PADDING_HORIZONTAL)}`,
				minWidth: 200,
				width: 225,
				backgroundColor: theme.palette.background.main,
				border: 1,
				borderStyle: "solid",
				borderColor: theme.palette.border.light,
				...sx,
			}}
		>
			{children}
		</Box>
	);
};

BaseBox.propTypes = {
	children: PropTypes.node.isRequired,
	sx: PropTypes.object,
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
	const [dateRange, setDateRange] = useState("all");
	const { statusColor, determineState } = useUtils();
	// These calculations are needed because ResponsiveContainer
	// doesn't take padding of parent/siblings into account
	// when calculating height.
	const chartContainerHeight = 300;
	const totalChartContainerPadding =
		parseInt(theme.spacing(BASE_BOX_PADDING_VERTICAL), 10) * 2;
	const totalTypographyPadding = parseInt(theme.spacing(TYPOGRAPHY_PADDING), 10) * 2;
	const areaChartHeight =
		(chartContainerHeight - totalChartContainerPadding - totalTypographyPadding) * 0.95;
	// end height calculations

	// Fetch data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await networkService.getStatsByMonitorId({
					authToken: authToken,
					monitorId: monitorId,
					sortOrder: "asc",
					limit: null,
					dateRange: dateRange,
					numToDisplay: 50,
					normalize: false,
				});
				setMonitor(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const statBoxConfigs = [
		{
			id: 0,
			heading: "CPU",
			subHeading: `${monitor?.checks[0]?.cpu?.physical_core} cores`,
		},
		{
			id: 1,
			heading: "Memory",
			subHeading: formatBytes(monitor?.checks[0]?.memory?.total_bytes),
		},
		{
			id: 2,
			heading: "Disk",
			subHeading: formatBytes(monitor?.checks[0]?.disk[0]?.total_bytes),
		},
		{ id: 3, heading: "Uptime", subHeading: "100%" },
		{
			id: 4,
			heading: "Status",
			subHeading: monitor?.status === true ? "Active" : "Inactive",
		},
	];

	const gaugeBoxConfigs = [
		{
			type: "memory",
			value: monitor?.checks[0]?.memory?.usage_percent * 100,
			heading: "Memory Usage",
			metricOne: "Used",
			valueOne: formatBytes(monitor?.checks[0]?.memory?.used_bytes),
			metricTwo: "Total",
			valueTwo: formatBytes(monitor?.checks[0]?.memory?.total_bytes),
		},
		{
			type: "cpu",
			value: monitor?.checks[0]?.cpu?.usage_percent * 100,
			heading: "CPU Usage",
			metricOne: "Cores",
			valueOne: monitor?.checks[0]?.cpu?.physical_core,
			metricTwo: "Frequency",
			valueTwo: `${(monitor?.checks[0]?.cpu?.frequency / 1000).toFixed(2)} Ghz`,
		},
		...(monitor?.checks[0]?.disk ?? []).map((disk, idx) => ({
			type: "disk",
			diskIndex: idx,
			value: disk.usage_percent * 100,
			heading: `Disk${idx} usage`,
			metricOne: "Used",
			valueOne: formatBytes(disk.total_bytes - disk.free_bytes),
			metricTwo: "Total",
			valueTwo: formatBytes(disk.total_bytes),
		})),
	];

	const areaChartConfigs = [
		{
			type: "memory",
			dataKey: "memory.usage_percent",
			heading: "Memory usage",
			strokeColor: theme.palette.primary.main,
			yLabel: "Memory Usage",
		},
		{
			type: "cpu",
			dataKey: "cpu.usage_percent",
			heading: "CPU usage",
			strokeColor: theme.palette.success.main,
			yLabel: "CPU Usage",
		},
		...(monitor?.checks?.[0]?.disk?.map((disk, idx) => ({
			type: "disk",
			diskIndex: idx,
			dataKey: `disk[${idx}].usage_percent`,
			heading: `Disk${idx} usage`,
			strokeColor: theme.palette.warning.main,
			yLabel: "Disk Usage",
		})) || []),
	];

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
						<Box>
							<PulseDot color={statusColor[determineState(monitor)]} />
						</Box>
						<Typography
							alignSelf="end"
							component="h1"
							variant="h1"
						>
							{monitor.name}
						</Typography>
						<Typography alignSelf="end">{monitor.url || "..."}</Typography>
						<Box sx={{ flexGrow: 1 }} />
						<Typography alignSelf="end">
							Checking every {formatDurationRounded(monitor?.interval)}
						</Typography>
						<Typography alignSelf="end">
							Last checked {formatDurationSplit(monitor?.lastChecked).time}{" "}
							{formatDurationSplit(monitor?.lastChecked).format} ago
						</Typography>
					</Stack>
					<Stack
						direction="row"
						gap={theme.spacing(8)}
					>
						{statBoxConfigs.map((statBox) => (
							<StatBox
								key={statBox.id}
								{...statBox}
							/>
						))}
					</Stack>
					<Stack
						direction="row"
						gap={theme.spacing(8)}
					>
						{gaugeBoxConfigs.map((config) => (
							<GaugeBox
								key={`${config.type}-${config.diskIndex ?? ""}`}
								value={config.value}
								heading={config.heading}
								metricOne={config.metricOne}
								valueOne={config.valueOne}
								metricTwo={config.metricTwo}
								valueTwo={config.valueTwo}
							/>
						))}
					</Stack>
					<Stack
						direction={"row"}
						height={chartContainerHeight} // FE team HELP!
						gap={theme.spacing(8)} // FE team HELP!
						flexWrap="wrap" // //FE team HELP! Better way to do this?
						sx={{
							"& > *": {
								flexBasis: `calc(50% - ${theme.spacing(8)})`,
								maxWidth: `calc(50% - ${theme.spacing(8)})`,
							},
						}}
					>
						{areaChartConfigs.map((config) => (
							<BaseBox key={`${config.type}-${config.diskIndex ?? ""}`}>
								<Typography
									component="h2"
									padding={theme.spacing(8)}
								>
									{config.heading}
								</Typography>
								<AreaChart
									height={areaChartHeight}
									data={monitor?.checks ?? []}
									dataKey={config.dataKey}
									xKey="createdAt"
									yKey={config.dataKey}
									customTooltip={({ active, payload, label }) => (
										<InfrastructureTooltip
											label={label}
											yKey={
												config.type === "disk" ? "disk.usage_percent" : config.dataKey
											}
											yLabel={config.yLabel}
											yIdx={config.diskIndex}
											active={active}
											payload={payload}
										/>
									)}
									xTick={<TzTick />}
									yTick={<PercentTick />}
									strokeColor={config.strokeColor}
									gradient={true}
									gradientStartColor={config.strokeColor}
									gradientEndColor="#ffffff"
								/>
							</BaseBox>
						))}
					</Stack>
				</Stack>
			</Box>
		)
	);
};

export default InfrastructureDetails;
