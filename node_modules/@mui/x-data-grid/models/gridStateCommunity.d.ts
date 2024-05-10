import type { Theme } from '@mui/material/styles';
import type { GridColumnMenuState, GridColumnsInitialState, GridColumnsState, GridColumnsGroupingState, GridColumnPinningState, GridDensityState, GridDimensionsState, GridFilterInitialState, GridFilterState, GridFocusState, GridPaginationInitialState, GridPaginationState, GridPreferencePanelInitialState, GridPreferencePanelState, GridRowsState, GridSortingInitialState, GridSortingState, GridTabIndexState, GridVirtualizationState } from '../hooks';
import type { GridRowsMetaState } from '../hooks/features/rows/gridRowsMetaState';
import type { GridEditingState } from './gridEditRowModel';
import { GridHeaderFilteringState } from './gridHeaderFilteringModel';
import type { GridRowSelectionModel } from './gridRowSelectionModel';
import type { GridVisibleRowsLookupState } from '../hooks/features/filter/gridFilterState';
import type { GridColumnResizeState } from '../hooks/features/columnResize';
/**
 * The state of `DataGrid`.
 */
export interface GridStateCommunity {
    theme: Theme;
    dimensions: GridDimensionsState;
    rows: GridRowsState;
    visibleRowsLookup: GridVisibleRowsLookupState;
    rowsMeta: GridRowsMetaState;
    editRows: GridEditingState;
    headerFiltering: GridHeaderFilteringState;
    pagination: GridPaginationState;
    columns: GridColumnsState;
    columnGrouping: GridColumnsGroupingState;
    columnMenu: GridColumnMenuState;
    pinnedColumns: GridColumnPinningState;
    sorting: GridSortingState;
    focus: GridFocusState;
    tabIndex: GridTabIndexState;
    rowSelection: GridRowSelectionModel;
    filter: GridFilterState;
    preferencePanel: GridPreferencePanelState;
    density: GridDensityState;
    virtualization: GridVirtualizationState;
    columnResize: GridColumnResizeState;
}
/**
 * The initial state of `DataGrid`.
 */
export interface GridInitialStateCommunity {
    pagination?: GridPaginationInitialState;
    sorting?: GridSortingInitialState;
    filter?: GridFilterInitialState;
    columns?: GridColumnsInitialState;
    preferencePanel?: GridPreferencePanelInitialState;
    density?: GridDensityState;
}
