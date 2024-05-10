import * as React from 'react';
import { TablePaginationProps, LabelDisplayedRowsArgs } from '@mui/material/TablePagination';
export type WrappedLabelDisplayedRows = (args: LabelDisplayedRowsArgs & {
    estimated?: number;
}) => React.ReactNode;
interface GridPaginationOwnProps {
    component?: React.ElementType;
}
declare const GridPagination: React.ForwardRefExoticComponent<Omit<Partial<Omit<TablePaginationProps, "component">> & GridPaginationOwnProps, "ref"> & React.RefAttributes<unknown>>;
export { GridPagination };
