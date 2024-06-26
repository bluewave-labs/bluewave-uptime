import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";

/**
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */

const ProgressUpload = ({
  icon,
  label,
  size,
  progress = 0,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <Box
      className="progress-bar-container"
      mt="20px"
      sx={{
        minWidth: "200px",
        height: "fit-content",
        borderRadius: `${theme.shape.borderRadius}px`,
        border: `solid 1px ${theme.palette.otherColors.graishWhite}`,
      }}
    >
      <Stack direction="row" mb="10px" gap="10px" alignItems="flex-end">
        {icon ? (
          <IconButton
            sx={{
              backgroundColor: theme.palette.otherColors.white,
              pointerEvents: "none",
              borderRadius: `${theme.shape.borderRadius}px`,
              border: `solid ${theme.shape.borderThick}px ${theme.palette.otherColors.graishWhite}`,
              boxShadow: theme.shape.boxShadow,
            }}
          >
            {icon}
          </IconButton>
        ) : (
          ""
        )}
        <Box>
          <Typography variant="h4" component="h2" mb="5px">
            {label}
          </Typography>
          <Typography variant="h4" component="p">
            {size}
          </Typography>
        </Box>
        <IconButton
          onClick={onClick}
          sx={{
            alignSelf: "flex-start",
            ml: "auto",
            mr: "-5px",
            mt: "-5px",
            padding: "5px",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <CloseIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Box sx={{ width: "100%", mr: "10px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: "100%",
              height: "10px",
              borderRadius: theme.shape.borderRadius,
              maxWidth: "500px",
              backgroundColor: theme.palette.otherColors.graishWhite,
            }}
          />
        </Box>
        <Typography variant="h4" component="p" sx={{ minWidth: "max-content" }}>
          {progress}
          <span>%</span>
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProgressUpload;
