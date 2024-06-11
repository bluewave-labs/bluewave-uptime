import { Box, Typography, useTheme } from '@mui/material';
import Button from '../Button';
import PropTypes from 'prop-types';

/**
 * Integrations component
 * @param {Object} props - Props for the IntegrationsComponent.
 * @param {string} props.url - The URL for the integration image.
 * @param {string} props.header - The header for the integration.
 * @param {string} props.info - Information about the integration.
 * @param {Function} props.onClick - The onClick handler for the integration button.
 * @returns {JSX.Element} The JSX representation of the IntegrationsComponent.
 */
const IntegrationsComponent = ({ url, header, info, onClick }) => {
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
        src={url}
        alt="Integration"
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
        <Typography variant="h6" component="div" style={{ fontSize: '16px' }}>
          {header}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            maxWidth: '300px',
            wordWrap: 'break-word',
            textAlign: 'left'
          }}
          style={{ fontSize: '13px' }}
        >
          {info}
        </Typography>
      </Box>
      
      <Button label="Click Me" level="primary" onClick={onClick} />
    </Box>
  );
};

// PropTypes for IntegrationsComponent
IntegrationsComponent.propTypes = {
  url: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default IntegrationsComponent;
