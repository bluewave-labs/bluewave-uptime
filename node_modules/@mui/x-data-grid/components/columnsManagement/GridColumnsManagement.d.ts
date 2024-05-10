import * as React from 'react';
import type { GridColDef } from '../../models/colDef/gridColDef';
export interface GridColumnsManagementProps {
    sort?: 'asc' | 'desc';
    searchPredicate?: (column: GridColDef, searchValue: string) => boolean;
    /**
     * If `true`, the column search field will be focused automatically.
     * If `false`, the first column switch input will be focused automatically.
     * This helps to avoid input keyboard panel to popup automatically on touch devices.
     * @default true
     */
    autoFocusSearchField?: boolean;
    /**
     * If `true`, the `Show/Hide all` toggle checkbox will not be displayed.
     * @default false
     */
    disableShowHideToggle?: boolean;
    /**
     * If `true`, the `Reset` button will not be disabled
     * @default false
     */
    disableResetButton?: boolean;
    /**
     * Changes the behavior of the `Show/Hide All` toggle when the search field is used:
     * - `all`: Will toggle all columns.
     * - `filteredOnly`: Will only toggle columns that match the search criteria.
     * @default 'all'
     */
    toggleAllMode?: 'all' | 'filteredOnly';
    /**
     * Returns the list of togglable columns.
     * If used, only those columns will be displayed in the panel
     * which are passed as the return value of the function.
     * @param {GridColDef[]} columns The `ColDef` list of all columns.
     * @returns {GridColDef['field'][]} The list of togglable columns' field names.
     */
    getTogglableColumns?: (columns: GridColDef[]) => GridColDef['field'][];
}
declare function GridColumnsManagement(props: GridColumnsManagementProps): React.JSX.Element;
declare namespace GridColumnsManagement {
    var propTypes: any;
}
export { GridColumnsManagement };
