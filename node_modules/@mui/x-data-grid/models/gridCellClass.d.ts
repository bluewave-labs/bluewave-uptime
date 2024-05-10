import { GridValidRowModel } from './gridRows';
import { GridCellParams } from './params/gridCellParams';
/**
 * A function used to process cellClassName params.
 */
export type GridCellClassFn<R extends GridValidRowModel = any, V = unknown> = (params: GridCellParams<R, V>) => string;
/**
 * The union type representing the [[GridColDef]] cell class type.
 */
export type GridCellClassNamePropType<R extends GridValidRowModel = any, V = unknown> = string | GridCellClassFn<R, V>;
