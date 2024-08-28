import { Skeleton, Stack } from "@mui/material";
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Skeleton variant="rounded" width="50%" height={36} />
        <Skeleton variant="rounded" width="15%" height={36} />
      </Stack>
      <Stack
        gap={theme.gap.large}
        direction="row"
        justifyContent="space-between"
      >
        <Skeleton variant="rounded" width="100%" height={100} />
        <Skeleton variant="rounded" width="100%" height={100} />
        <Skeleton variant="rounded" width="100%" height={100} />
      </Stack>
      <Stack gap={theme.gap.large} p={theme.gap.xl} backgroundColor="#f9fafb">
        <Skeleton variant="rounded" width="50%" height={25} />
        <Skeleton variant="rounded" width="100%" height={300} />
        <Skeleton variant="rounded" width="100%" height={100} />
      </Stack>
    </>
  );
};

export default SkeletonLayout;
