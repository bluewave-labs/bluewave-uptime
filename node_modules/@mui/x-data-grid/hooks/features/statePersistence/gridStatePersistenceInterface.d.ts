import { GridInitialStateCommunity } from '../../../models/gridStateCommunity';
export interface GridStatePersistenceApi<InitialState extends GridInitialStateCommunity> {
    /**
     * Generates a serializable object containing the exportable parts of the DataGrid state.
     * These values can then be passed to the `initialState` prop or injected using the `restoreState` method.
     * @param {GridExportStateParams} params With all properties from [[GridExportStateParams]]
     * @returns {GridInitialState} The exported state.
     */
    exportState: (params?: GridExportStateParams) => InitialState;
    /**
     * Inject the given values into the state of the DataGrid.
     * @param {GridInitialState} stateToRestore The exported state to restore.
     */
    restoreState: (stateToRestore: InitialState) => void;
}
export interface GridRestoreStatePreProcessingValue {
    /**
     * Functions to run after the state has been updated but before re-rendering.
     * This is usually used to apply derived states like `applyFilters` or `applySorting`
     */
    callbacks: (() => void)[];
}
/**
 * Object passed as parameter in the `exportState()` grid API method.
 * @demos
 *   - [Restore state with `apiRef`](/x/react-data-grid/state/#restore-the-state-with-apiref)
 */
export interface GridExportStateParams {
    /**
     * By default, the grid exports all the models.
     * You can switch this property to `true` to only exports models that are either controlled, initialized or modified.
     * For instance, with this property, if you don't control or initialize the `filterModel` and you did not apply any filter, the model won't be exported.
     * Note that the column dimensions are not a model. The grid only exports the dimensions of the modified columns even when `exportOnlyDirtyModels` is false.
     * @default false
     */
    exportOnlyDirtyModels?: boolean;
}
export interface GridRestoreStatePreProcessingContext<I extends GridInitialStateCommunity> {
    stateToRestore: I;
}
