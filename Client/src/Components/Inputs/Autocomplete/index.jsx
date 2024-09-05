import { Autocomplete, TextField, Typography } from "@mui/material";
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
 * @param {Object} props.sx - The style object for the component container.
 * @param {Object} props.style - The style object for the component.
 * @param {number} props.width - The width of the component.
 * @param {string} props.autoCompleteValue - The value of the autocomplete field.
 * @param {Function} props.setAutoCompleteValue - The function to set the value of the autocomplete field.
 * @param {string} props.autoCompleteInputValue - The input value of the autocomplete field.
 * @param {Function} props.setAutoCompleteInputValue - The function to set the input value of the autocomplete field.
 * @returns {JSX.Element} The AutoCompleteField component.
 */

const AutoCompleteField = ({
  id,
  type,
  options,
  placeholder = "Type to search",
  disabled,
  sx,
  style,
  width,
  autoCompleteValue,
  setAutoCompleteValue,
  autoCompleteInputValue,
  setAutoCompleteInputValue,
  error,
}) => {
  const theme = useTheme();

  return (
    <>
      <Autocomplete
        style={style}
        sx={sx}
        freeSolo
        className="auto-complete-field"
        id={id}
        value={autoCompleteValue}
        onChange={(event, newValue) => {
          setAutoCompleteValue(newValue);
        }}
        inputValue={autoCompleteInputValue}
        onInputChange={(event, newInputValue) => {
          setAutoCompleteInputValue(newInputValue);
        }}
        options={options}
        getOptionLabel={(option) => (option && option.name ? option.name : "")}
        renderInput={(params) => (
          <TextField
            error={error ? true : false}
            {...params}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            InputProps={{
              ...params.InputProps,
              sx: {
                width: width,
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
      {error && (
        <Typography
          component="span"
          className="input-error"
          color={theme.palette.error.text}
          mt={theme.spacing(2)}
          sx={{
            opacity: 0.8,
            fontSize: 13,
          }}
        >
          {error}
        </Typography>
      )}
    </>
  );
};

AutoCompleteField.displayName = "AutoCompleteField";

AutoCompleteField.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "number"]),
  options: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.number,
  sx: PropTypes.object,
  style: PropTypes.object,
};

export default AutoCompleteField;
