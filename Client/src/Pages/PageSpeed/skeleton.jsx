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
		<Stack gap={theme.spacing(2)}>
			<Stack
				direction="row"
				justifyContent="space-between"
				mb={theme.spacing(12)}
			>
				<Box width="80%">
					<Skeleton
						variant="rounded"
						width="25%"
						height={24}
					/>
					<Skeleton
						variant="rounded"
						width="50%"
						height={19.5}
						sx={{ mt: theme.spacing(2) }}
					/>
				</Box>
				<Skeleton
					variant="rounded"
					width="20%"
					height={34}
					sx={{ alignSelf: "flex-end" }}
				/>
			</Stack>
			<Stack
				direction="row"
				flexWrap="wrap"
				gap={theme.spacing(12)}
			>
				<Skeleton
					variant="rounded"
					width="100%"
					height={120}
					sx={{ flex: "35%" }}
				/>
				<Skeleton
					variant="rounded"
					width="100%"
					height={120}
					sx={{ flex: "35%" }}
				/>
				<Skeleton
					variant="rounded"
					width="100%"
					height={120}
					sx={{ flex: "35%" }}
				/>
				<Skeleton
					variant="rounded"
					width="100%"
					height={120}
					sx={{ flex: "35%" }}
				/>
			</Stack>
		</Stack>
	);
};

export default SkeletonLayout;
