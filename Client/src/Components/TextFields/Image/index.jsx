import React, { useState } from "react";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./index.css";

/**
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ImageField = ({ id, onChange }) => {
  const theme = useTheme();

  const [isDragging, setIsDragging] = useState(false);
  const handleDragEnter = () => {
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Box
      className="image-field-wrapper"
      sx={{
        position: "relative",
        width: "fit-content",
        height: "fit-content",
        border: "dashed",
        borderRadius: theme.shape.borderRadius / 2,
        borderSpacing: "10px",
        borderColor: isDragging
          ? theme.palette.primary.main
          : theme.palette.otherColors.graishWhite,
        borderWidth: "2px",
        transition: "0.2s",
        "&:hover": {
          borderColor: theme.palette.primary.main,
          backgroundColor: "hsl(215, 87%, 51%, 0.05)",
        },
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDragLeave}
    >
      <TextField
        id={id}
        type="file"
        sx={{
          "& .MuiInputBase-input[type='file']": {
            opacity: 0,
            cursor: "pointer",
            padding: 10,
            maxHeight: "300px",
            height: "100%",
          },
          "& fieldset": {
            padding: 0,
            border: "none",
          },
        }}
      />
      <Stack
        className="custom-file-text"
        alignItems="center"
        gap="10px"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
          width: "100%",
        }}
      >
        <IconButton
          sx={{
            pointerEvents: "none",
            borderRadius: "2px",
            border: `solid 2px ${theme.palette.otherColors.graishWhite}`,
            boxShadow: theme.shape.boxShadow,
          }}
        >
          <CloudUploadIcon />
        </IconButton>
        <Typography variant="h4" component="h2">
          <span>Click to upload</span> or drag and drop
        </Typography>
        <Typography variant="h4" component="p">
          (max. 800x400px)
        </Typography>
      </Stack>
    </Box>
  );
};

export default ImageField;
