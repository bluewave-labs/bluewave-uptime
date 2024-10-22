import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import Search from "../../../../Components/Inputs/Search";
import MemoizedMonitorTable from "../MonitorTable";
import { useState } from "react";
import useDebounce from "../../../../Utils/debounce";
import PropTypes from "prop-types";

const CurrentMonitoring = ({ totalMonitors, monitors, isAdmin }) => {
	const theme = useTheme();
	const [search, setSearch] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const debouncedFilter = useDebounce(search, 500);
	const handleSearch = (value) => {
		setIsSearching(true);
		setSearch(value);
	};
	return (
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
					{totalMonitors}
				</Box>
				<Box
					width="25%"
					minWidth={150}
					ml="auto"
				>
					<Search
						options={monitors}
						filteredBy="name"
						inputValue={search}
						handleInputChange={handleSearch}
					/>
				</Box>
			</Stack>
			<MemoizedMonitorTable
				isAdmin={isAdmin}
				filter={debouncedFilter}
				setIsSearching={setIsSearching}
				isSearching={isSearching}
			/>
		</Box>
	);
};

CurrentMonitoring.propTypes = {
	totalMonitors: PropTypes.number,
	monitors: PropTypes.array,
	isAdmin: PropTypes.bool,
};

export { CurrentMonitoring };
