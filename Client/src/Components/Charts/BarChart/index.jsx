import { useTheme } from "@emotion/react";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { formatDate } from "../../../Utils/timeUtils";
import "./index.css";

const BarChart = ({ checks = [] }) => {
  const theme = useTheme();

  // set responseTime to average if there's only one check
  if (checks.length === 1) {
    checks[0] = { ...checks[0], responseTime: 50 };
  }

  if (checks.length !== 25) {
    const placeholders = Array(25 - checks.length).fill("placeholder");
    checks = [...checks, ...placeholders];
  }

  return (
    <Stack
      direction="row"
      flexWrap="nowrap"
      gap="3px"
      height="50px"
      width="fit-content"
      onClick={(event) => event.stopPropagation()}
      sx={{
        cursor: "default",
      }}
    >
      {checks.map((check, index) =>
        check === "placeholder" ? (
          <Box
            key={`${check}-${index}`}
            position="relative"
            width="9px"
            height="100%"
            backgroundColor={theme.palette.otherColors.fillGray}
            sx={{
              borderRadius: "3px",
            }}
          />
        ) : (
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
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}
          >
            <Box
              position="relative"
              width="9px"
              height="100%"
              backgroundColor={
                check.status ? theme.label.up.bgColor : theme.label.down.bgColor
              }
              sx={{
                borderRadius: "3px",
                "&:hover > .MuiBox-root": {
                    filter: "brightness(0.8)",
                  },
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
                  borderRadius: "3px",
                }}
              />
            </Box>
          </Tooltip>
        )
      )}
    </Stack>
  );
};

export default BarChart;
