import type { GridStateColDef } from '../colDef/gridColDef';
import { GridValidRowModel } from '../gridRows';
/**
 * Object passed as parameter in the column [[GridColDef]] header renderer.
 */
export interface GridColumnHeaderParams<R extends GridValidRowModel = GridValidRowModel, V = any, F = V> {
    /**
     * The column field of the column that triggered the event
     */
    field: string;
    /**
     * The column of the current header component.
     */
    colDef: GridStateColDef<R, V, F>;
}
