import { Stack, Skeleton } from "@mui/material";
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
			<Stack
				direction="row"
				alignItems="center"
				gap={theme.spacing(6)}
			>
				<Skeleton
					variant="rounded"
					width={150}
					height={34}
				/>
				<Skeleton
					variant="rounded"
					width="15%"
					height={34}
				/>
				<Skeleton
					variant="rounded"
					width="20%"
					height={34}
					sx={{ ml: "auto" }}
				/>
			</Stack>
			<Skeleton
				variant="rounded"
				width="100%"
				height={300}
			/>
			<Skeleton
				variant="rounded"
				width="100%"
				height={100}
			/>
		</>
	);
};

export default SkeletonLayout;
