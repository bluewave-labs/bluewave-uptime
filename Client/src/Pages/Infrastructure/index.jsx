import { Box, Button } from "@mui/material";
import { Heading } from "../../Components/Heading";
import { useNavigate } from "react-router-dom";

/**
 * This is the Infrastructure monitoring page. This is a work in progress
 *
 * @param  - Define params.
 * @returns {JSX.Element} The infrastructure monitoring page.
 */

function Infrastructure() {
	const navigate = useNavigate();	
	return (
		<Box component="main">
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					navigate("/infrastructure/create");
				}}
				sx={{ fontWeight: 500 }}
			>
				Create monitor
			</Button>
			<Heading component="h2">Infrastructure monitors</Heading>
		</Box>
	);
}

export { Infrastructure };
