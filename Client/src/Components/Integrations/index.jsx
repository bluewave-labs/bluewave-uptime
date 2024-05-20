import { Box, Button, Typography } from '@mui/material';

const Integrations = () => {
  return (
    <Box display="flex" alignItems="center" p={2} border={1} borderRadius={2}>
      <Box component="img" src="https://via.placeholder.com/100" alt="Placeholder" width={100} height={100} />
      
      <Box flex={1} mx={2} display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="h6" component="div">
          Header
        </Typography>
        <Typography variant="body1" component="div" sx={{ maxWidth: '300px', wordWrap: 'break-word', textAlign: 'left' }}>
          This is a paragraph that provides more detail about the header.
        </Typography>
      </Box>
      
      <Button variant="contained" color="primary" sx={{ minWidth: '120px', minHeight: '45px' }}>
        Click Me
      </Button>
    </Box>
  );
};

export default Integrations;
