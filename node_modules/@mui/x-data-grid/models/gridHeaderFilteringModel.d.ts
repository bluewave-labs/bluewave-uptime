import { GridColDef } from './colDef';
export type GridHeaderFilteringState = {
    enabled: boolean;
    editing: GridColDef['field'] | null;
    menuOpen: GridColDef['field'] | null;
};
