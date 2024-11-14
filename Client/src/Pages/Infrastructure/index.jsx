import { Box, Button } from "@mui/material";
import { Heading } from "../../Components/Heading";

/**
 * This is the Infrastructure monitoring page. This is a work in progress
 *
 * @param  - Define params.
 * @returns {JSX.Element} The infrastructure monitoring page.
 */

function Infrastructure() {
	return (
		<Box component="main">
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					// navigate("/monitors/create");
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
