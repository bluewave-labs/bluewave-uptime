import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const teamMembers = [
  { title: 'John Doe'},
  { title: 'Jane Smith'},
  { title: 'Alex Johnson'},
];

export default function Search() {
  return (
    <Box padding={10}> {/* Add padding to the container */}
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
          value.map((option, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={option.title}
              {...getTagProps({ index })}
            />
          ))
        }
      />
    </Box>
  );
}
