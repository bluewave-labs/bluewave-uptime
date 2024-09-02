import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import "./index.css";
import React from "react";
import PropTypes from "prop-types";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
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
 * @param {string} props.setWidth - The width of the input field.
 * @returns {JSX.Element} The AutoCompleteField component.
 */

const AutoCompleteField = ({
  id,
  type,
  options,
  placeholder = "Search",
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
        <div ref={params.InputProps.ref}>
          <TextField
            type={type}
            {...params.inputProps}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      )}
      renderOption={(props, option, { inputValue }) => {
        const { key, ...optionProps } = props;
        const matches = match(option.name, inputValue, {
          insideWords: true,
        });
        const parts = parse(option.name, matches);

        return (
          <li key={key} {...optionProps}>
            <div>
              {parts.map((part, index) => (
                <span key={index}>{part.text}</span>
              ))}
            </div>
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
            fontSize: "var(--env-var-font-size-medium)",
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
