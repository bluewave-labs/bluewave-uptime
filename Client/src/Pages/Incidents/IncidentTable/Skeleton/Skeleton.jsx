import { Skeleton /* , Stack */ } from "@mui/material";
const IncidentSkeleton = () => {
	return (
		<>
			<Skeleton
				animation={"wave"}
				variant="rounded"
				width="100%"
				height={300}
			/>
			<Skeleton
				animation={"wave"}
				variant="rounded"
				width="100%"
				height={100}
			/>
		</>
	);
};

export { IncidentSkeleton };
