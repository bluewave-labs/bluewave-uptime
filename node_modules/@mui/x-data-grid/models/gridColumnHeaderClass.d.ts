import { GridColumnHeaderParams } from './params/gridColumnHeaderParams';
/**
 * A function used to process headerClassName params.
 */
export type GridColumnHeaderClassFn = (params: GridColumnHeaderParams) => string;
/**
 * The union type representing the [[GridColDef]] column header class type.
 */
export type GridColumnHeaderClassNamePropType = string | GridColumnHeaderClassFn;
