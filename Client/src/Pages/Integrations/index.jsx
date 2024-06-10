import IntegrationsComponent from '../../Components/Integrations';
import { Box, Typography, useTheme } from '@mui/material';

/**
 * Integrations Page Component
 * @returns {JSX.Element}
 */
const Integrations = () => {
    const theme = useTheme();
  
    return (
      <Box 
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        height="100vh"
        p={theme.spacing(4)}
        mt={theme.spacing(8)} 
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Integrations
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Connect Uptime Genie to your favorite service
        </Typography>
        <Box 
          display="flex" 
          flexWrap="wrap" 
          gap={theme.spacing(4)}
        >
          <IntegrationsComponent />
          <IntegrationsComponent />
          <IntegrationsComponent />
        </Box>
      </Box>
    );
  };
  
  export default Integrations;
