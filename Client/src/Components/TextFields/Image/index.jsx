import React, { useState } from "react";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./index.css";

/**
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ImageField = ({ id, picture, onChange }) => {
  const theme = useTheme();

  const [isDragging, setIsDragging] = useState(false);
  const handleDragEnter = () => {
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      {!picture ? (
        <Box
          className="image-field-wrapper"
          mt="20px"
          sx={{
            position: "relative",
            height: "fit-content",
            border: "dashed",
            borderRadius: `${theme.shape.borderRadius}px`,
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
            onChange={onChange}
            sx={{
              width: "100%",
              "& .MuiInputBase-input[type='file']": {
                opacity: 0,
                cursor: "pointer",
                maxWidth: "500px",
                minHeight: "175px"
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
                borderRadius: `${theme.shape.borderRadius}px`,
                border: `solid ${theme.shape.borderThick}px ${theme.palette.otherColors.graishWhite}`,
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
      ) : (
        <Stack direction="row" justifyContent="center">
          <Box
            sx={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundImage: `url(${picture})`,
              backgroundSize: "cover"
            }}
          >
          </Box>
        </Stack>
      )}
    </>
  );
};

export default ImageField;
