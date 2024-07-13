import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "../../Button";
import "./index.css";
import { useState } from "react";

/**
 * @param {Object} props
 * @param {string} [props.type] - Type of input field (e.g., 'text', 'password').
 * @param {string} props.id - ID of the input field.
 * @param {string} [props.label] - Label for the input field.
 * @param {boolean} [props.isRequired] - Indicates if the field is required, will display a red asterisk.
 * @param {boolean} [props.isOptional] - Indicates if the field is optional, will display optional text.
 * @param {boolean} [props.hasCopy] - Indicates if the field supports copying.
 * @param {string} [props.autoComplete] - Autocomplete value for the input field.
 * @param {string} [props.placeholder] - Placeholder text for the input field.
 * @param {string} props.value - Value of the input field.
 * @param {function} props.onChange - Function called on input change.
 * @param {string} [props.error] - Error message to display for the input field.
 * @param {boolean} [props.disabled] - Indicates if the input field is disabled.
 */

const Field = ({
  type = "text",
  id,
  label,
  isRequired,
  isOptional,
  hasCopy,
  autoComplete,
  placeholder,
  value,
  onChange,
  error,
  disabled,
}) => {
  const theme = useTheme();

  // TODO - are we using this feature anywhere ?
  const [copy, setCopy] = useState(false);
  const handleCopy = () => {
    setCopy(true);
    setTimeout(() => setCopy(false), 1000);
  };

  const [isVisible, setVisible] = useState(false);

  return (
    <Stack gap={theme.gap.xs} className={`field field-${type}`}>
      {label && (
        <Typography component="h3">
          {label}
          {isRequired ? <span className="field-required">*</span> : ""}
          {isOptional ? <span className="field-optional">(optional)</span> : ""}
        </Typography>
      )}
      <TextField
        type={type === "password" ? (isVisible ? "text" : type) : type}
        id={id}
        autoComplete={autoComplete}
        placeholder={placeholder}
        multiline={type === "description"}
        rows={type === "description" ? 4 : 1}
        value={value}
        onChange={onChange}
        disabled={disabled}
        InputProps={{
          startAdornment: type === "url" && (
            <Stack
              direction="row"
              alignItems="center"
              height="100%"
              sx={{
                borderRight: `solid 1px ${theme.palette.section.borderColor}`,
              }}
            >
              <Typography component="h5">https://</Typography>
            </Stack>
          ),
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setVisible((show) => !show)}
                  tabIndex={-1}
                  sx={{
                    color: theme.palette.section.borderColor,
                    padding: `calc(${theme.gap.xs} / 2)`,
                    "&:focus": {
                      outline: "none",
                    },
                    "& .MuiTouchRipple-root": {
                      pointerEvents: "none",
                      display: "none",
                    },
                  }}
                >
                  {!isVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : (
              hasCopy && (
                <InputAdornment className="copy" position="end">
                  <Button
                    level="tertiary"
                    label={copy ? "Copied" : "Copy"}
                    img={<ContentCopyIcon />}
                    onClick={handleCopy}
                    sx={{
                      borderLeft: `solid 1px ${theme.palette.section.borderColor}`,
                      lineHeight: 0,
                      "& .MuiTouchRipple-root": {
                        pointerEvents: "none",
                        display: "none",
                      },
                    }}
                  />
                </InputAdornment>
              )
            ),
        }}
      />
      {error && (
        <Typography component="span" className="input-error" mt={theme.gap.xs}>
          {error}
        </Typography>
      )}
    </Stack>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(["text", "password", "url", "email", "description"]),
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isOptional: PropTypes.bool,
  hasCopy: PropTypes.bool,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Field;
