import { GridStateCommunity } from '../../../models/gridStateCommunity';
import { GridColumnLookup, GridPinnedColumnFields } from './gridColumnsInterfaces';
/**
 * Get the columns state
 * @category Columns
 */
export declare const gridColumnsStateSelector: (state: GridStateCommunity) => import("./gridColumnsInterfaces").GridColumnsState;
/**
 * Get an array of column fields in the order rendered on screen.
 * @category Columns
 */
export declare const gridColumnFieldsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, string[]>;
/**
 * Get the columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Columns
 */
export declare const gridColumnLookupSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, GridColumnLookup>;
/**
 * Get an array of column definitions in the order rendered on screen..
 * @category Columns
 */
export declare const gridColumnDefinitionsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../../internals").GridStateColDef[]>;
/**
 * Get the column visibility model, containing the visibility status of each column.
 * If a column is not registered in the model, it is visible.
 * @category Visible Columns
 */
export declare const gridColumnVisibilityModelSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("./gridColumnsInterfaces").GridColumnVisibilityModel>;
/**
 * Get the visible columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Visible Columns
 */
export declare const gridVisibleColumnDefinitionsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../../internals").GridStateColDef[]>;
/**
 * Get the field of each visible column.
 * @category Visible Columns
 */
export declare const gridVisibleColumnFieldsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, string[]>;
/**
 * Get the visible pinned columns model.
 * @category Visible Columns
 */
export declare const gridPinnedColumnsSelector: (state: GridStateCommunity) => GridPinnedColumnFields;
/**
 * Get the visible pinned columns.
 * @category Visible Columns
 */
export declare const gridVisiblePinnedColumnDefinitionsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, {
    left: import("../../../internals").GridStateColDef[];
    right: import("../../../internals").GridStateColDef[];
}>;
/**
 * Get the left position in pixel of each visible columns relative to the left of the first column.
 * @category Visible Columns
 */
export declare const gridColumnPositionsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number[]>;
/**
 * Get the summed width of all the visible columns.
 * @category Visible Columns
 */
export declare const gridColumnsTotalWidthSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
/**
 * Get the filterable columns as an array.
 * @category Columns
 */
export declare const gridFilterableColumnDefinitionsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../../internals").GridStateColDef[]>;
/**
 * Get the filterable columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Columns
 */
export declare const gridFilterableColumnLookupSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, GridColumnLookup>;
/**
 * Checks if some column has a colSpan field.
 * @category Columns
 * @ignore - Do not document
 */
export declare const gridHasColSpanSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, boolean>;
