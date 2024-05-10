import { DataGridProcessedProps, DataGridProps, DataGridPropsWithDefaultValues } from '../models/props/DataGridProps';
import { GridValidRowModel } from '../models';
/**
 * The default values of `DataGridPropsWithDefaultValues` to inject in the props of DataGrid.
 */
export declare const DATA_GRID_PROPS_DEFAULT_VALUES: DataGridPropsWithDefaultValues;
export declare const useDataGridProps: <R extends GridValidRowModel>(inProps: DataGridProps<R>) => DataGridProcessedProps<R>;
