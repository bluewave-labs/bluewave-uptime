import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import "./index.css";
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

/**
 * AutoCompleteField component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the autocomplete field.
 * @param {string} props.type - The type of the input field (text or number).
 * @param {Array} props.options - The options for the autocomplete field.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 * @returns {JSX.Element} The AutoCompleteField component.
 */

const AutoCompleteField = ({
  id,
  type,
  options,
  placeholder = "Type to search",
  disabled,
}) => {
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const theme = useTheme();

  return (
    <Autocomplete
      className="auto-complete-field"
      id={id}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <div
          ref={params.InputProps.ref}
          style={{
            borderRadius:
              theme.components.MuiAutocomplete.styleOverrides.root.borderRadius,
            fontSize:
              theme.components.MuiAutocomplete.styleOverrides.root.fontSize,
          }}
        >
          <TextField
            type={type}
            {...params.inputProps}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              width: theme.components.MuiAutocomplete.styleOverrides.root.width,
            }}
          />
        </div>
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={option._id} {...optionProps}>
            <div>{<span>{option.name}</span>}</div>
          </li>
        );
      }}
      slotProps={{
        paper: {
          sx: {
            marginTop: theme.spacing(2),
            border: 1,
            borderColor: theme.palette.border.light,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shape.boxShadow,
            backgroundColor: theme.palette.background.main,
            paddingY: 0,
            paddingX: 2,
            fontSize:
              theme.components.MuiAutocomplete.styleOverrides.root.fontSize,
          },
        },
      }}
    />
  );
};

AutoCompleteField.displayName = "AutoCompleteField";

AutoCompleteField.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "number"]),
  options: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  setWidth: PropTypes.string,
};

export default AutoCompleteField;
