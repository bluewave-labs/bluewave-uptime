import { GridFilterModel } from '../gridFilterModel';
import { GridFilterItem, GridLogicOperator } from '../gridFilterItem';
import { GridControlledStateReasonLookup } from '../events';
import type { DataGridProcessedProps } from '../props/DataGridProps';
/**
 * The filter API interface that is available in the grid [[apiRef]].
 */
export interface GridFilterApi {
    /**
     * Shows the filter panel. If `targetColumnField` is given, a filter for this field is also added.
     * @param {string} targetColumnField The column field to add a filter.
     * @param {string} panelId The unique panel id
     * @param {string} labelId The unique button id
     */
    showFilterPanel: (targetColumnField?: string, panelId?: string, labelId?: string) => void;
    /**
     * Hides the filter panel.
     */
    hideFilterPanel: () => void;
    /**
     * Updates or inserts a [[GridFilterItem]].
     * @param {GridFilterItem} item The filter to update.
     */
    upsertFilterItem: (item: GridFilterItem) => void;
    /**
     * Updates or inserts many [[GridFilterItem]].
     * @param {GridFilterItem[]} items The filters to update.
     */
    upsertFilterItems: (items: GridFilterItem[]) => void;
    /**
     * Applies all filters on all rows.
     * @ignore - do not document.
     */
    unstable_applyFilters: () => void;
    /**
     * Deletes a [[GridFilterItem]].
     * @param {GridFilterItem} item The filter to delete.
     */
    deleteFilterItem: (item: GridFilterItem) => void;
    /**
     * Changes the [[GridLogicOperator]] used to connect the filters.
     * @param {GridLogicOperator} operator The new logic operator. It can be: `"and"` or `"or`".
     */
    setFilterLogicOperator: (operator: GridLogicOperator) => void;
    /**
     * Sets the filter model to the one given by `model`.
     * @param {GridFilterModel} model The new filter model.
     * @param {string} reason The reason for the model to have changed.
     */
    setFilterModel: (model: GridFilterModel, reason?: GridControlledStateReasonLookup['filter']) => void;
    /**
     * Set the quick filter values to the one given by `values`
     * @param {any[]} values The list of element to quick filter
     */
    setQuickFilterValues: (values: any[]) => void;
    /**
     * Returns the value of the `ignoreDiacritics` prop.
     */
    ignoreDiacritics: DataGridProcessedProps['ignoreDiacritics'];
}
