import { Box, Stack } from "@mui/material";

const PulseDot = ({ color }) => {
  return (
    <Stack
      width="26px"
      height="24px"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="14px"
        height="14px"
        sx={{
          position: "relative",
          backgroundColor: color,
          borderRadius: "50%",
          "&::before": {
            content: `""`,
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "inherit",
            borderRadius: "50%",
            animation: "ripple 1.8s ease-out infinite",
          },
        }}
      />
    </Stack>
  );
};

export default PulseDot;
