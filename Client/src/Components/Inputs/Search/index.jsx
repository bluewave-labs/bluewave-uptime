import PropTypes from "prop-types";
import { Box, ListItem, Autocomplete, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import SearchIcon from "../../../assets/icons/search.svg?react";

/**
 * Search component using Material UI's Autocomplete.
 *
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the Autocomplete component
 * @param {Array<Object>} props.options - Options to display in the Autocomplete dropdown
 * @param {string} props.filteredBy - Key to access the option label from the options
 * @param {string} props.value - Current input value for the Autocomplete
 * @param {Function} props.handleChange - Function to call when the input changes
 * @param {Object} props.sx - Additional styles to apply to the component
 * @returns {JSX.Element} The rendered Search component
 */
const Search = ({ id, options, filteredBy, value, handleChange, sx }) => {
  const theme = useTheme();

  return (
    <Autocomplete
      id={id}
      inputValue={value}
      onInputChange={(event, newValue) => {
        handleChange(newValue);
      }}
      fullWidth
      freeSolo
      disableClearable
      options={options}
      getOptionLabel={(option) => option[filteredBy]}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Type to search"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Box
                mr={theme.spacing(4)}
                height={16}
                sx={{
                  "& svg": {
                    width: 16,
                    height: 16,
                    "& path": {
                      stroke: theme.palette.text.tertiary,
                      strokeWidth: 1.2,
                    },
                  },
                }}
              >
                <SearchIcon />
              </Box>
            ),
          }}
          sx={{
            "& fieldset": {
              borderColor: theme.palette.border.light,
              borderRadius: theme.shape.borderRadius,
            },
            "& .MuiOutlinedInput-root:hover:not(:has(input:focus)):not(:has(textarea:focus)) fieldset":
              {
                borderColor: theme.palette.border.light,
              },
          }}
        />
      )}
      filterOptions={(options, { inputValue }) => {
        const filtered = options.filter((option) =>
          option[filteredBy].toLowerCase().includes(inputValue.toLowerCase())
        );

        if (filtered.length === 0) {
          return [{ [filteredBy]: "No monitors found", noOptions: true }];
        }
        return filtered;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <ListItem
            key={key}
            {...optionProps}
            sx={
              option.noOptions
                ? {
                    pointerEvents: "none",
                    backgroundColor: theme.palette.background.main,
                  }
                : {}
            }
          >
            {option[filteredBy]}
          </ListItem>
        );
      }}
      slotProps={{
        popper: {
          keepMounted: true,
          sx: {
            "& ul": { p: 2 },
            "& li.MuiAutocomplete-option": {
              color: theme.palette.text.secondary,
              px: 4,
              borderRadius: theme.shape.borderRadius,
            },
            "& .MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true'], & .MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true'].Mui-focused, & .MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true']:hover":
              {
                backgroundColor: theme.palette.background.fill,
              },
            "& .MuiAutocomplete-noOptions": {
              px: theme.spacing(6),
              py: theme.spacing(5),
            },
          },
        },
      }}
      sx={{
        height: 34,
        "&.MuiAutocomplete-root .MuiAutocomplete-input": { p: 0 },
        ...sx,
      }}
    />
  );
};

Search.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array.isRequired,
  filteredBy: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default Search;
