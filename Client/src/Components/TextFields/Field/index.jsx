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
import "./index.css";

const Field = ({
  type = "text",
  id,
  label,
  isRequired,
  isOptional,
  isVisible,
  setVisibility,
  autoComplete,
  placeholder,
  value,
  onChange,
  error,
  disabled,
}) => {
  const theme = useTheme();

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
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setVisibility((show) => !show)}
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

export default Field;
