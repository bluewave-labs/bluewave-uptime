import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

/**
 * @example
 *
 * const options = [
 * { _id: "66d6119ef959cbc681e034f0", name: "Googler" },
 * { _id: "66d6119ef959cbc681e034f0", name: "CNN" },
 * { _id: "66d61a1bf959cbc681e0353f", name: "X Corp." },
 * ];
 *
 * <AutoCompleteField options={options} />
 *
 */

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
        <TextField
          {...params}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          InputProps={{
            ...params.InputProps,
            sx: {
              width: 360,
              height: 34,
              fontSize: 13,
              p: 0,
              borderRadius: theme.shape.borderRadius,
              "& input": {
                p: 0,
              },
            },
          }}
        />
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
        popper: {
          sx: {
            "& ul": { p: 0 },
            "& li": { borderRadius: theme.shape.borderRadius },
          },
        },
        paper: {
          sx: {
            p: 2,
            fontSize: 13,
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
