import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';
import StatusTable from '../../Components/StatusTable'; // Make sure to import the correct path to your IncidentHistoryTable component

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

const titles = [
  { title: 'Down' },
  { title: 'Cannot resolve' },
  { title: 'Clear / show all' },
];

/**
 * Filter component with autocomplete for status filtering.
 * @returns {JSX.Element} The JSX element representing the filter component.
 */
function Filter() {
  return (
    <Autocomplete
      id="filter-demo"
      options={titles}
      getOptionLabel={(option) => option.title}
      filterOptions={filterOptions}
      sx={{
        width: 170,
        '& .MuiAutocomplete-inputRoot': {
          height: '50px',
        },
        '& .MuiAutocomplete-listbox': {
          maxHeight: '200px',
        },
      }}
      disableClearable
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={
            <React.Fragment>
              <TuneIcon sx={{ marginRight: '0.5rem', position: 'relative', top: '6px' }} />
              Filter by status
            </React.Fragment>
          }
          InputProps={{ ...params.InputProps, endAdornment: null }}
        />
      )}
    />
  );
}

/**
 * Customized table component displaying incident history with a filter.
 * @returns {JSX.Element} The JSX element representing the customized table with a filter.
 */
export default function CustomizedTables() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: theme.spacing(4),
        marginX: 'auto',
        width: '80%',
        paddingX: theme.spacing(6),
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing(2) }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: 16 }}>
          Incident History
        </Typography>
        <Filter />
      </Box>
      <StatusTable />
    </Box>
  );
}
