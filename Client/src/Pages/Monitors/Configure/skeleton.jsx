import { Box, Skeleton, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

/**
 * Renders a skeleton layout.
 *
 * @returns {JSX.Element}
 */
const SkeletonLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Skeleton variant="rounded" width="15%" height={34} />
      <Stack gap={theme.gap.xl} mt={theme.gap.medium}>
        <Stack direction="row" gap={theme.gap.small} mt={theme.gap.small}>
          <Skeleton
            variant="circular"
            style={{ minWidth: 24, minHeight: 24 }}
          />
          <Box width="80%">
            <Skeleton
              variant="rounded"
              width="50%"
              height={24}
              sx={{ mb: theme.gap.small }}
            />
            <Skeleton variant="rounded" width="50%" height={18} />
          </Box>
          <Stack
            direction="row"
            gap={theme.gap.medium}
            sx={{
              ml: "auto",
              alignSelf: "flex-end",
            }}
          >
            <Skeleton variant="rounded" width={150} height={34} />
          </Stack>
        </Stack>
        <Skeleton variant="rounded" width="100%" height={200} />
        <Skeleton variant="rounded" width="100%" height={200} />
        <Skeleton variant="rounded" width="100%" height={200} />
        <Stack direction="row" justifyContent="flex-end">
          <Skeleton variant="rounded" width="15%" height={34} />
        </Stack>
      </Stack>
    </>
  );
};

export default SkeletonLayout;
