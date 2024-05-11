import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTheme } from "@mui/material";

const teamMembers = [
  { title: 'John Doe'},
  { title: 'Jane Smith'},
  { title: 'Alex Johnson'},
];

/**
 * @component
 * @returns {JSX.Element}
 */

export default function Search()
 {
  const theme = useTheme();
  return (
    <Box padding={theme.spacing(2)}> {/* Add padding to the container */}
      <Autocomplete
        multiple
        id="tags-outlined"
        options={teamMembers}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Team Members"
            placeholder="Favorites"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option) => (
            <Chip
              key={option.title}
              variant="outlined"
              label={option.title}
              {...getTagProps({ option })}
            />
          ))
        }
      />
    </Box>
  );
}
