import { useTheme } from "@emotion/react";
import Fallback from "../../Components/Fallback";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateStatus from "./CreateStatus";
import { useEffect } from "react";
import { networkService } from "../../main";
import { useSelector } from "react-redux";

const Status = () => {
	const theme = useTheme();
	const navigate = useNavigate();	
	const {authToken} = useSelector((state) => state.auth);
	const {apiBaseUrl} = useSelector((state) => state.settings);	
	let initForm = {}

	useEffect(() => {
		const getStatusPage = async () => {
			let config = { authToken: authToken, url: apiBaseUrl };
			initForm = await networkService.getStatusPageByUrl(config);
		};
		getStatusPage();
	}, []);

	return (
		<>
			{Object.keys(initForm).length===0? (
				<Box
					className="status"
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
					<Fallback
						title="status page"
						checks={[
							"Share your uptime publicly",
							"Keep your users informed about incidents",
							"Build trust with your customers",
						]}
					/>
					<Stack
						alignItems="center"
						mt={theme.spacing(10)}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								navigate("/status/create");
							}}
							sx={{ fontWeight: 500 }}
						>
							Let's create your status page
						</Button>
					</Stack>
				</Box>
			) : (
					<CreateStatus initForm={initForm}/>
			 )}
		</>
	);	
};

export default Status;
