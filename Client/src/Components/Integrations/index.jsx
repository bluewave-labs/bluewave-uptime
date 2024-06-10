import { Box, Typography, useTheme } from '@mui/material';
import Button from '../Button';

/**
 * Integrations component
 * @returns {JSX.Element}
 */
const IntegrationsComponent = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      p={theme.spacing(2)}
      border={1}
      borderColor={theme.palette.divider}
      borderRadius={theme.shape.borderRadius}
    >
      <Box
        component="img"
        src="https://via.placeholder.com/100"
        alt="Placeholder"
        width={100}
        height={100}
      />
      
      <Box
        flex={1}
        mx={theme.spacing(2)}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Typography variant="h6" component="div">
          Header
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            maxWidth: '300px',
            wordWrap: 'break-word',
            textAlign: 'left'
          }}
        >
          This is a paragraph that provides more detail about the header.
        </Typography>
      </Box>
      
      <Button label="Click Me" level="primary" />
    </Box>
  );
};

export default IntegrationsComponent;
