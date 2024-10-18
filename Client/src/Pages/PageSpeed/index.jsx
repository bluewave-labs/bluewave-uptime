import { Box, Button, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { getPageSpeedByTeamId } from "../../Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import Fallback from "../../Components/Fallback";
import "./index.css";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Greeting from "../../Utils/greeting";
import SkeletonLayout from "./skeleton";
import Card from "./card";
import { networkService } from "../../main";

const PageSpeed = ({ isAdmin }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, authToken } = useSelector((state) => state.auth);
	const [isLoading, setIsLoading] = useState(true);
	const [monitors, setMonitors] = useState([]);
	useEffect(() => {
		dispatch(getPageSpeedByTeamId(authToken));
	}, [authToken, dispatch]);

	useEffect(() => {
		const fetchMonitors = async () => {
			try {
				setIsLoading(true);
				const res = await networkService.getMonitorsByTeamId({
					authToken: authToken,
					teamId: user.teamId,
					limit: 10,
					types: ["pagespeed"],
					status: null,
					checkOrder: "desc",
					normalize: true,
					page: null,
					rowsPerPage: null,
					filter: null,
					field: null,
					order: null,
				});
				if (res?.data?.data?.monitors) {
					setMonitors(res.data.data.monitors);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMonitors();
	}, []);

	// will show skeletons only on initial load
	// since monitor state is being added to redux persist, there's no reason to display skeletons on every render
	let isActuallyLoading = isLoading && monitors?.length === 0;
	return (
		<Box
			className="page-speed"
			sx={{
				':has(> [class*="fallback__"])': {
					position: "relative",
					border: 1,
					borderColor: theme.palette.border.light,
					borderRadius: theme.shape.borderRadius,
					borderStyle: "dashed",
					backgroundColor: theme.palette.background.main,
					overflow: "hidden",
				},
			}}
		>
			{isActuallyLoading ? (
				<SkeletonLayout />
			) : monitors?.length !== 0 ? (
				<Box>
					<Box mb={theme.spacing(12)}>
						<Breadcrumbs list={[{ name: `pagespeed`, path: "/pagespeed" }]} />
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							mt={theme.spacing(5)}
						>
							<Greeting type="pagespeed" />
							{isAdmin && (
								<Button
									variant="contained"
									color="primary"
									onClick={() => navigate("/pagespeed/create")}
									sx={{ whiteSpace: "nowrap" }}
								>
									Create new
								</Button>
							)}
						</Stack>
					</Box>
					<Grid
						container
						spacing={theme.spacing(12)}
					>
						{monitors?.map((monitor) => (
							<Card
								monitor={monitor}
								key={monitor._id}
							/>
						))}
					</Grid>
				</Box>
			) : (
				<Fallback
					title="pagespeed monitor"
					checks={[
						"Report on the user experience of a page",
						"Help analyze webpage speed",
						"Give suggestions on how the page can be improved",
					]}
					link="/pagespeed/create"
					isAdmin={isAdmin}
				/>
			)}
		</Box>
	);
};
PageSpeed.propTypes = {
	isAdmin: PropTypes.bool,
};

export default PageSpeed;
