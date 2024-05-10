import * as React from 'react';
import { GridFilterItem } from './gridFilterItem';
import type { GridColDef } from './colDef/gridColDef';
import type { GridValidRowModel } from './gridRows';
import type { GridApiCommunity } from './api/gridApiCommunity';
type ApplyFilterFn<R extends GridValidRowModel = any, V = any, F = V> = (value: V, row: R, column: GridColDef<R, V, F>, apiRef: React.MutableRefObject<GridApiCommunity>) => boolean;
export type GetApplyFilterFn<R extends GridValidRowModel = any, V = any, F = V> = (filterItem: GridFilterItem, column: GridColDef<R, V, F>) => null | ApplyFilterFn<R, V, F>;
/**
 * Filter operator definition interface.
 * @demos
 *   - [Custom filter operator](/x/react-data-grid/filtering/customization/#create-a-custom-operator)
 */
export interface GridFilterOperator<R extends GridValidRowModel = any, V = any, F = V> {
    /**
     * The label of the filter operator.
     */
    label?: string;
    /**
     * The label of the filter shown in header filter row.
     */
    headerLabel?: string;
    /**
     * The name of the filter operator.
     * It will be matched with the `operator` property of the filter items.
     */
    value: string;
    /**
     * The callback that generates a filtering function for a given filter item and column.
     * This function can return `null` to skip filtering for this item and column.
     * @param {GridFilterItem} filterItem The filter item with which we want to filter the column.
     * @param {GridColDef} column The column from which we want to filter the rows.
     * @returns {null | ApplyFilterFn} The function to call to check if a row pass this filter item or not.
     */
    getApplyFilterFn: GetApplyFilterFn<R, V, F>;
    /**
     * The input component to render in the filter panel for this filter operator.
     */
    InputComponent?: React.JSXElementConstructor<any>;
    /**
     * The props to pass to the input component in the filter panel for this filter operator.
     */
    InputComponentProps?: Record<string, any>;
    /**
     * Converts the value of a filter item to a human-readable form.
     * @param {GridFilterItem['value']} value The filter item value.
     * @returns {string} The value formatted to be displayed in the UI of filter button tooltip.
     */
    getValueAsString?: (value: GridFilterItem['value']) => string;
    /**
     * If `false`, filter operator doesn't require user-entered value to work.
     * Usually should be set to `false` for filter operators that don't have `InputComponent` (for example `isEmpty`)
     * @default true
     */
    requiresFilterValue?: boolean;
}
export {};
