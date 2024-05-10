import { GridCellCoordinates } from '../../../models/gridCell';
export type GridColumnIdentifier = {
    field: string;
};
export type GridColumnGroupIdentifier = {
    field: string;
    depth: number;
};
export interface GridFocusState {
    cell: GridCellCoordinates | null;
    columnHeader: GridColumnIdentifier | null;
    columnHeaderFilter: GridColumnIdentifier | null;
    columnGroupHeader: GridColumnGroupIdentifier | null;
}
export interface GridTabIndexState {
    cell: GridCellCoordinates | null;
    columnHeader: GridColumnIdentifier | null;
    columnHeaderFilter: GridColumnIdentifier | null;
    columnGroupHeader: GridColumnGroupIdentifier | null;
}
