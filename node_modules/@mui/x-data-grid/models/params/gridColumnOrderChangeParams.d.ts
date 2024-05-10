import type { GridColDef } from '../colDef/gridColDef';
/**
 * Object passed as parameter of the column order change event.
 */
export interface GridColumnOrderChangeParams {
    /**
     * The column of the current header component.
     */
    column: GridColDef;
    /**
     * The target column index.
     */
    targetIndex: number;
    /**
     * The old column index.
     */
    oldIndex: number;
}
