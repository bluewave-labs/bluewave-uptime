import * as React from 'react';
import { GridFilterItem, GridFilterModel } from '../../../models';
import type { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridStateCommunity } from '../../../models/gridStateCommunity';
import { GridAggregatedFilterItemApplier, GridFilterItemResult, GridQuickFilterValueResult } from './gridFilterState';
/**
 * Adds default values to the optional fields of a filter items.
 * @param {GridFilterItem} item The raw filter item.
 * @param {React.MutableRefObject<GridPrivateApiCommunity>} apiRef The API of the grid.
 * @return {GridFilterItem} The clean filter item with an uniq ID and an always-defined operator.
 * TODO: Make the typing reflect the different between GridFilterInputItem and GridFilterItem.
 */
export declare const cleanFilterItem: (item: GridFilterItem, apiRef: React.MutableRefObject<GridPrivateApiCommunity>) => GridFilterItem;
export declare const sanitizeFilterModel: (model: GridFilterModel, disableMultipleColumnsFiltering: boolean, apiRef: React.MutableRefObject<GridPrivateApiCommunity>) => GridFilterModel;
export declare const mergeStateWithFilterModel: (filterModel: GridFilterModel, disableMultipleColumnsFiltering: boolean, apiRef: React.MutableRefObject<GridPrivateApiCommunity>) => (filteringState: GridStateCommunity['filter']) => GridStateCommunity['filter'];
export declare const removeDiacritics: (value: unknown) => unknown;
export declare const shouldQuickFilterExcludeHiddenColumns: (filterModel: GridFilterModel) => boolean;
export declare const buildAggregatedFilterApplier: (filterModel: GridFilterModel, apiRef: React.MutableRefObject<GridPrivateApiCommunity>, disableEval: boolean) => GridAggregatedFilterItemApplier;
type FilterCache = {
    cleanedFilterItems?: GridFilterItem[];
};
export declare const passFilterLogic: (allFilterItemResults: (null | GridFilterItemResult)[], allQuickFilterResults: (null | GridQuickFilterValueResult)[], filterModel: GridFilterModel, apiRef: React.MutableRefObject<GridPrivateApiCommunity>, cache: FilterCache) => boolean;
export {};
