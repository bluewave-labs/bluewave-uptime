import * as React from 'react';
import { DataGridProps } from '../models/props/DataGridProps';
import { GridValidRowModel } from '../models/gridRows';
export type { GridSlotsComponent as GridSlots } from '../models';
interface DataGridComponent {
    <R extends GridValidRowModel = any>(props: DataGridProps<R> & React.RefAttributes<HTMLDivElement>): React.JSX.Element;
    propTypes?: any;
}
/**
 * Demos:
 * - [DataGrid](https://mui.com/x/react-data-grid/demo/)
 *
 * API:
 * - [DataGrid API](https://mui.com/x/api/data-grid/data-grid/)
 */
export declare const DataGrid: DataGridComponent;
