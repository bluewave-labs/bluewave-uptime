import PropTypes from "prop-types";
import { Box, ListItem, Autocomplete, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import SearchIcon from "../../../assets/icons/search.svg?react";

const options = [
  "Google",
  "Material UI",
  "Alias",
  "Twitter",
  "Discord",
  "YouTube",
];

const Search = ({ id, sx }) => {
  const theme = useTheme();

  return (
    <Autocomplete
      id={id}
      fullWidth
      freeSolo
      disableClearable
      options={options}
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
          option.toLowerCase().includes(inputValue.toLowerCase())
        );

        if (filtered.length === 0) {
          return [{ label: "No monitors found", noOptions: true }];
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
            {option.noOptions ? option.label : option}
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

export default Search;
