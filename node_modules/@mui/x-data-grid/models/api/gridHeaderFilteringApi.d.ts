import { GridColDef } from '../colDef';
import { GridHeaderFilteringState } from '../gridHeaderFilteringModel';
export interface GridHeaderFilteringPrivateApi {
    /**
     * Internal function to set the header filter state.
     * @param {Partial<GridHeaderFilteringState>} headerFilterState The field to be edited.
     * @ignore - do not document.
     */
    setHeaderFilterState: (headerFilterState: Partial<GridHeaderFilteringState>) => void;
}
export interface GridHeaderFilteringApi {
    /**
     * Puts the cell corresponding to the given row id and field into edit mode.
     * @param {GridColDef['field']} field The field of the header filter to put in edit mode.
     */
    startHeaderFilterEditMode: (field: GridColDef['field']) => void;
    /**
     * Stops the edit mode for the current field.
     */
    stopHeaderFilterEditMode: () => void;
    /**
     * Opens the header filter menu for the given field.
     * @param {GridColDef['field']} field The field of the header filter to open menu for.
     */
    showHeaderFilterMenu: (field: GridColDef['field']) => void;
    /**
     * Hides the header filter menu.
     */
    hideHeaderFilterMenu: () => void;
}
