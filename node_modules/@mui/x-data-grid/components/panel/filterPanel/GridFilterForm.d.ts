import * as React from 'react';
import { GridFilterItem, GridLogicOperator } from '../../../models/gridFilterItem';
import { GridColDef, GridStateColDef } from '../../../models/colDef/gridColDef';
export interface FilterColumnsArgs {
    field: GridColDef['field'];
    columns: GridStateColDef[];
    currentFilters: GridFilterItem[];
}
export interface GridFilterFormProps {
    /**
     * The [[GridFilterItem]] representing this form.
     */
    item: GridFilterItem;
    /**
     * If `true`, the logic operator field is rendered.
     * The field will be invisible if `showMultiFilterOperators` is also `true`.
     */
    hasMultipleFilters: boolean;
    /**
     * If `true`, the logic operator field is visible.
     */
    showMultiFilterOperators?: boolean;
    /**
     * If `true`, disables the logic operator field but still renders it.
     */
    disableMultiFilterOperator?: boolean;
    /**
     * A ref allowing to set imperative focus.
     * It can be passed to the el
     */
    focusElementRef?: React.Ref<any>;
    /**
     * Callback called when the operator, column field or value is changed.
     * @param {GridFilterItem} item The updated [[GridFilterItem]].
     */
    applyFilterChanges: (item: GridFilterItem) => void;
    /**
     * Callback called when the logic operator is changed.
     * @param {GridLogicOperator} operator The new logic operator.
     */
    applyMultiFilterOperatorChanges: (operator: GridLogicOperator) => void;
    /**
     * Callback called when the delete button is clicked.
     * @param {GridFilterItem} item The deleted [[GridFilterItem]].
     */
    deleteFilter: (item: GridFilterItem) => void;
    /**
     * Allows to filter the columns displayed in the filter form.
     * @param {FilterColumnsArgs} args The columns of the grid and name of field.
     * @returns {GridColDef['field'][]} The filtered fields array.
     */
    filterColumns?: (args: FilterColumnsArgs) => GridColDef['field'][];
    /**
     * Sets the available logic operators.
     * @default [GridLogicOperator.And, GridLogicOperator.Or]
     */
    logicOperators?: GridLogicOperator[];
    /**
     * Changes how the options in the columns selector should be ordered.
     * If not specified, the order is derived from the `columns` prop.
     */
    columnsSort?: 'asc' | 'desc';
    /**
     * Props passed to the delete icon.
     * @default {}
     */
    deleteIconProps?: any;
    /**
     * Props passed to the logic operator input component.
     * @default {}
     */
    logicOperatorInputProps?: any;
    /**
     * Props passed to the operator input component.
     * @default {}
     */
    operatorInputProps?: any;
    /**
     * Props passed to the column input component.
     * @default {}
     */
    columnInputProps?: any;
    /**
     * `true` if the filter is disabled/read only.
     * i.e. `colDef.fiterable = false` but passed in `filterModel`
     * @default false
     */
    readOnly?: boolean;
    /**
     * Props passed to the value input component.
     * @default {}
     */
    valueInputProps?: any;
    /**
     * @ignore - do not document.
     */
    children?: React.ReactNode;
}
declare const GridFilterForm: React.ForwardRefExoticComponent<GridFilterFormProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Demos:
 * - [Filtering - overview](https://mui.com/x/react-data-grid/filtering/)
 *
 * API:
 * - [GridFilterForm API](https://mui.com/x/api/data-grid/grid-filter-form/)
 */
export { GridFilterForm };
