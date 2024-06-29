import { Stack, Typography } from "@mui/material";
import "./flexibileTextField.css";
import React from "react";
import { useTheme } from "@emotion/react";

const FlexibileTextField = ({
  id,
  title,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const theme = useTheme();
  return (
    <Stack className="flexible-textfield" gap={theme.gap.small}>
      <Typography component="h2">{title}</Typography>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error ? (
        <Typography component="p" className="input-error">
          {error}
        </Typography>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default FlexibileTextField;
