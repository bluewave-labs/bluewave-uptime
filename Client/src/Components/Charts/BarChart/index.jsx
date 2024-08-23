import { useTheme } from "@emotion/react";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { formatDate } from "../../../Utils/timeUtils";
import "./index.css";

const BarChart = ({ checks = [] }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" flexWrap="nowrap" gap={theme.gap.xs} height="50px">
      {checks.map((check) => (
        <Tooltip
          title={
            <>
              <Typography>
                {formatDate(new Date(check.createdAt), { year: undefined })}
              </Typography>
              <Box mt={theme.gap.xs}>
                <Box
                  display="inline-block"
                  width={theme.gap.small}
                  height={theme.gap.small}
                  backgroundColor={
                    check.status
                      ? theme.label.up.dotColor
                      : theme.label.down.dotColor
                  }
                  sx={{ borderRadius: "50%" }}
                />
                <Stack
                  display="inline-flex"
                  direction="row"
                  justifyContent="space-between"
                  ml={theme.gap.xs}
                  gap={theme.gap.large}
                >
                  <Typography component="span" sx={{ opacity: 0.8 }}>
                    Response Time
                  </Typography>
                  <Typography component="span">
                    {check.originalResponseTime}
                    <Typography component="span" sx={{ opacity: 0.8 }}>
                      {" "}
                      ms
                    </Typography>
                  </Typography>
                </Stack>
              </Box>
            </>
          }
          placement="top"
          key={`check-${check?._id}`}
          slotProps={{
            popper: {
              className: "bar-tooltip",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -12],
                  },
                },
              ],
            },
          }}
        >
          <Box
            position="relative"
            width="8px"
            height="100%"
            backgroundColor={
              check.status ? theme.label.up.bgColor : theme.label.down.bgColor
            }
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
                check.status
                  ? theme.label.up.dotColor
                  : theme.label.down.dotColor
              }
              sx={{
                borderRadius: theme.gap.xs,
              }}
            />
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
};

export default BarChart;
