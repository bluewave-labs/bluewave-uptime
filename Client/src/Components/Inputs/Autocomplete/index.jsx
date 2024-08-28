import { Autocomplete, Stack, Typography } from "@mui/material";
import "./index.css";
import React from "react";
import PropTypes from "prop-types";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

/**
 * AutoCompleteField component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the autocomplete field.
 * @param {string} props.label - The label of the autocomplete field.
 * @param {React.Element} props.icon - The icon element to display.
 * @param {string} props.type - The type of the input field (text or number).
 * @param {Array} props.options - The options for the autocomplete field.
 * @param {string} props.error - The error message to display.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} props.isRequired - Indicates if the field is required.
 * @param {function} props.onChange - The function to handle onChange event.
 * @param {string} props.value - The value of the input field.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 * @param {string} props.setWidth - The width of the input field.
 * @returns {JSX.Element} The AutoCompleteField component.
 */

const AutoCompleteField = ({
  id,
  label,
  icon,
  type,
  options,
  error,
  placeholder,
  isRequired,
  onChange,
  value,
  disabled,
  setWidth,
}) => {
  return (
    <Stack className="auto-complete-field" gap={1}>
      {label && (
        <Typography
          style={{
            color: "var(--env-var-color-5)",
            fontSize: "var(--env-var-font-size-medium)",
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
      )}
      <Stack
        sx={{
          width: "fit-content",
          padding: "8px",
          borderRadius: "var( --env-var-radius-1)",
          border: isRequired ? "1px solid #d32f2f" : "1px solid #D0D5DD",
          alignItems: "center",
        }}
        gap={1}
        direction="row"
        alignItems="center"
      >
        {icon && icon}

        <Autocomplete
          id={id}
          options={options}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <div
              ref={params.InputProps.ref}
              style={{ minWidth: 250, maxWidth: 320, width: setWidth }}
            >
              <input
                type={type}
                {...params.inputProps}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                value={value}
              />
            </div>
          )}
          renderOption={(props, option, { inputValue }) => {
            const { key, ...optionProps } = props;
            const matches = match(option.title, inputValue, {
              insideWords: true,
            });
            const parts = parse(option.title, matches);

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
        />
      </Stack>
      {error && (
        <Typography
          style={{
            color: "var(--env-var-color-34)",
            fontSize: "var(--env-var-font-size-medium)",
            marginLeft: "var(--env-var-spacing-1)",
          }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

AutoCompleteField.displayName = "AutoCompleteField";

AutoCompleteField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
  type: PropTypes.oneOf(["text", "number"]),
  options: PropTypes.array,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  setWidth: PropTypes.string,
};

export default AutoCompleteField;
