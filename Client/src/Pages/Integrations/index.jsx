import { Box, Typography, useTheme } from '@mui/material';
import IntegrationsComponent from '../../Components/Integrations';


/**
 * Integrations Page Component
 * @returns {JSX.Element} The JSX representation of the Integrations page.
 */
const Integrations = () => {
  const theme = useTheme();


  const integrations = [
    { 
      url: 'https://via.placeholder.com/100',
      header: 'Integration 1',
      info: 'Info about Integration 1',
      onClick: () => {} 
    },
    { 
      url: 'https://via.placeholder.com/100',
      header: 'Integration 2',
      info: 'Info about Integration 2',
      onClick: () => {} 
    }, 
    { 
      url: 'https://via.placeholder.com/100',
      header: 'Integration 2',
      info: 'Info about Integration 2',
      onClick: () => {} 
    }
    // Add more integrations as needed
  ];

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
      <Typography variant="h4" component="h1" gutterBottom style={{ fontSize: '16px' }}>
        Integrations
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom style={{ fontSize: '13px' }}>
        Connect Uptime Genie to your favorite service
      </Typography>
      <Box 
        display="flex" 
        flexWrap="wrap" 
        gap={theme.spacing(4)}
      >
        {integrations.map((integration, index) => (
          <IntegrationsComponent 
            key={index}
            url={integration.url}
            header={integration.header}
            info={integration.info}
            onClick={integration.onClick}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Integrations;
