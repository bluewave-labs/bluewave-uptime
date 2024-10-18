import { Skeleton, TableCell, TableRow } from "@mui/material";
const ROWS_NUMBER = 7;
const ROWS_ARRAY = Array.from({ length: ROWS_NUMBER }, (_, i) => i);

const TableBodySkeleton = () => {
	return (
		<>
			{ROWS_ARRAY.map((row) => (
				<TableRow key={row}>
					<TableCell>
						<Skeleton />
					</TableCell>
					<TableCell>
						<Skeleton />
					</TableCell>
					<TableCell>
						<Skeleton />
					</TableCell>
					<TableCell>
						<Skeleton />
					</TableCell>
					<TableCell>
						<Skeleton />
					</TableCell>
				</TableRow>
			))}
		</>
	);
};

export { TableBodySkeleton };
