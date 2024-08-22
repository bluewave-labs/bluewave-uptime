import { useTheme } from "@emotion/react";
import { Box, Stack } from "@mui/material";

const BarChart = ({ checks = [] }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" flexWrap="nowrap" gap={theme.gap.xs} height="50px">
      {checks.map((check) => (
        <Box
          key={`check-${check?._id}`}
          position="relative"
          width="8px"
          height="100%"
          backgroundColor="#f4f4f4"
          sx={{
            borderRadius: theme.gap.xs,
          }}
        >
          <Box
            position="absolute"
            bottom={0}
            width="100%"
            height={`${check.responseTime}%`}
            backgroundColor={
              check.status === true
                ? "var(--env-var-color-23)"
                : "var(--env-var-color-24)"
            }
            sx={{
              borderRadius: theme.gap.xs,
            }}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default BarChart;
