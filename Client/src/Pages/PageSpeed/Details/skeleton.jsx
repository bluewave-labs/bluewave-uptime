import { Box, Skeleton, Stack } from "@mui/material";

/**
 * Renders a skeleton layout.
 *
 * @returns {JSX.Element}
 */
const SkeletonLayout = () => {
	return (
		<>
			<Skeleton
				variant="rounded"
				width="15%"
				height={34}
			/>
			<Stack
				direction="row"
				gap={4}
			>
				<Skeleton
					variant="circular"
					style={{ minWidth: 24, minHeight: 24 }}
				/>
				<Box width="85%">
					<Skeleton
						variant="rounded"
						width="50%"
						height={24}
					/>
					<Skeleton
						variant="rounded"
						width="50%"
						height={18}
						sx={{ mt: 4 }}
					/>
				</Box>
				<Skeleton
					variant="rounded"
					width="15%"
					height={34}
					sx={{ alignSelf: "flex-end" }}
				/>
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-between"
				gap={20}
				flexWrap="wrap"
			>
				<Skeleton
					variant="rounded"
					width="30%"
					height={90}
					sx={{ flex: 1 }}
				/>
				<Skeleton
					variant="rounded"
					width="30%"
					height={90}
					sx={{ flex: 1 }}
				/>
				<Skeleton
					variant="rounded"
					width="30%"
					height={90}
					sx={{ flex: 1 }}
				/>
			</Stack>
			<Skeleton
				variant="rounded"
				width="25%"
				height={24}
			/>
			<Skeleton
				variant="rounded"
				width="100%"
				height={300}
			/>
			<Skeleton
				variant="rounded"
				width="25%"
				height={24}
			/>
			<Skeleton
				variant="rounded"
				width="100%"
				height={300}
			/>
		</>
	);
};

export default SkeletonLayout;
