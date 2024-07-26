import { Box } from "@mui/material";
import Fallback from "../../Components/Fallback";

const PageSpeed = () => {
  return (
    <Box className="page-speed">
      <Fallback
        title="page speed"
        checks={[
          "Report on the user experience of a page",
          "Help analyze webpage speed",
          "Give suggestions on how the page can be improved",
        ]}
      />
    </Box>
  );
};

export default PageSpeed;
