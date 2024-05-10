import _extends from "@babel/runtime/helpers/esm/extends";
import { GridLogicOperator } from '../../../models';
import { getDefaultGridFilterModel } from './gridFilterState';
import { buildWarning } from '../../../utils/warning';
import { getPublicApiRef } from '../../../utils/getPublicApiRef';
import { gridColumnFieldsSelector, gridColumnLookupSelector, gridVisibleColumnFieldsSelector } from '../columns';
let hasEval;
function getHasEval() {
  if (hasEval !== undefined) {
    return hasEval;
  }
  try {
    hasEval = new Function('return true')();
  } catch (_) {
    hasEval = false;
  }
  return hasEval;
}
/**
 * Adds default values to the optional fields of a filter items.
 * @param {GridFilterItem} item The raw filter item.
 * @param {React.MutableRefObject<GridPrivateApiCommunity>} apiRef The API of the grid.
 * @return {GridFilterItem} The clean filter item with an uniq ID and an always-defined operator.
 * TODO: Make the typing reflect the different between GridFilterInputItem and GridFilterItem.
 */
export const cleanFilterItem = (item, apiRef) => {
  const cleanItem = _extends({}, item);
  if (cleanItem.id == null) {
    cleanItem.id = Math.round(Math.random() * 1e5);
  }
  if (cleanItem.operator == null) {
    // Selects a default operator
    // We don't use `apiRef.current.getColumn` because it is not ready during state initialization
    const column = gridColumnLookupSelector(apiRef)[cleanItem.field];
    cleanItem.operator = column && column.filterOperators[0].value;
  }
  return cleanItem;
};
const filterModelDisableMultiColumnsFilteringWarning = buildWarning(['MUI X: The `filterModel` can only contain a single item when the `disableMultipleColumnsFiltering` prop is set to `true`.', 'If you are using the community version of the `DataGrid`, this prop is always `true`.'], 'error');
const filterModelMissingItemIdWarning = buildWarning('MUI X: The `id` field is required on `filterModel.items` when you use multiple filters.', 'error');
const filterModelMissingItemOperatorWarning = buildWarning('MUI X: The `operator` field is required on `filterModel.items`, one or more of your filtering item has no `operator` provided.', 'error');
export const sanitizeFilterModel = (model, disableMultipleColumnsFiltering, apiRef) => {
  const hasSeveralItems = model.items.length > 1;
  let items;
  if (hasSeveralItems && disableMultipleColumnsFiltering) {
    filterModelDisableMultiColumnsFilteringWarning();
    items = [model.items[0]];
  } else {
    items = model.items;
  }
  const hasItemsWithoutIds = hasSeveralItems && items.some(item => item.id == null);
  const hasItemWithoutOperator = items.some(item => item.operator == null);
  if (hasItemsWithoutIds) {
    filterModelMissingItemIdWarning();
  }
  if (hasItemWithoutOperator) {
    filterModelMissingItemOperatorWarning();
  }
  if (hasItemWithoutOperator || hasItemsWithoutIds) {
    return _extends({}, model, {
      items: items.map(item => cleanFilterItem(item, apiRef))
    });
  }
  if (model.items !== items) {
    return _extends({}, model, {
      items
    });
  }
  return model;
};
export const mergeStateWithFilterModel = (filterModel, disableMultipleColumnsFiltering, apiRef) => filteringState => _extends({}, filteringState, {
  filterModel: sanitizeFilterModel(filterModel, disableMultipleColumnsFiltering, apiRef)
});
export const removeDiacritics = value => {
  if (typeof value === 'string') {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  return value;
};
const getFilterCallbackFromItem = (filterItem, apiRef) => {
  if (!filterItem.field || !filterItem.operator) {
    return null;
  }
  const column = apiRef.current.getColumn(filterItem.field);
  if (!column) {
    return null;
  }
  let parsedValue;
  if (column.valueParser) {
    const parser = column.valueParser;
    parsedValue = Array.isArray(filterItem.value) ? filterItem.value?.map(x => parser(x, undefined, column, apiRef)) : parser(filterItem.value, undefined, column, apiRef);
  } else {
    parsedValue = filterItem.value;
  }
  const {
    ignoreDiacritics
  } = apiRef.current.rootProps;
  if (ignoreDiacritics) {
    parsedValue = removeDiacritics(parsedValue);
  }
  const newFilterItem = _extends({}, filterItem, {
    value: parsedValue
  });
  const filterOperators = column.filterOperators;
  if (!filterOperators?.length) {
    throw new Error(`MUI X: No filter operators found for column '${column.field}'.`);
  }
  const filterOperator = filterOperators.find(operator => operator.value === newFilterItem.operator);
  if (!filterOperator) {
    throw new Error(`MUI X: No filter operator found for column '${column.field}' and operator value '${newFilterItem.operator}'.`);
  }
  const publicApiRef = getPublicApiRef(apiRef);
  const applyFilterOnRow = filterOperator.getApplyFilterFn(newFilterItem, column);
  if (typeof applyFilterOnRow !== 'function') {
    return null;
  }
  return {
    item: newFilterItem,
    fn: row => {
      let value = apiRef.current.getRowValue(row, column);
      if (ignoreDiacritics) {
        value = removeDiacritics(value);
      }
      return applyFilterOnRow(value, row, column, publicApiRef);
    }
  };
};
let filterItemsApplierId = 1;

/**
 * Generates a method to easily check if a row is matching the current filter model.
 * @param {GridFilterModel} filterModel The model with which we want to filter the rows.
 * @param {React.MutableRefObject<GridPrivateApiCommunity>} apiRef The API of the grid.
 * @returns {GridAggregatedFilterItemApplier | null} A method that checks if a row is matching the current filter model. If `null`, we consider that all the rows are matching the filters.
 */
const buildAggregatedFilterItemsApplier = (filterModel, apiRef, disableEval) => {
  const {
    items
  } = filterModel;
  const appliers = items.map(item => getFilterCallbackFromItem(item, apiRef)).filter(callback => !!callback);
  if (appliers.length === 0) {
    return null;
  }
  if (disableEval || !getHasEval()) {
    // This is the original logic, which is used if `eval()` is not supported (aka prevented by CSP).
    return (row, shouldApplyFilter) => {
      const resultPerItemId = {};
      for (let i = 0; i < appliers.length; i += 1) {
        const applier = appliers[i];
        if (!shouldApplyFilter || shouldApplyFilter(applier.item.field)) {
          resultPerItemId[applier.item.id] = applier.fn(row);
        }
      }
      return resultPerItemId;
    };
  }

  // We generate a new function with `new Function()` to avoid expensive patterns for JS engines
  // such as a dynamic object assignment, for example `{ [dynamicKey]: value }`.
  const filterItemCore = new Function('appliers', 'row', 'shouldApplyFilter', `"use strict";
${appliers.map((applier, i) => `const shouldApply${i} = !shouldApplyFilter || shouldApplyFilter(${JSON.stringify(applier.item.field)});`).join('\n')}

const result$$ = {
${appliers.map((applier, i) => `  ${JSON.stringify(String(applier.item.id))}: !shouldApply${i} ? false : appliers[${i}].fn(row),`).join('\n')}
};

return result$$;`.replaceAll('$$', String(filterItemsApplierId)));
  filterItemsApplierId += 1;

  // Assign to the arrow function a name to help debugging
  const filterItem = (row, shouldApplyItem) => filterItemCore(appliers, row, shouldApplyItem);
  return filterItem;
};
export const shouldQuickFilterExcludeHiddenColumns = filterModel => {
  return filterModel.quickFilterExcludeHiddenColumns ?? true;
};

/**
 * Generates a method to easily check if a row is matching the current quick filter.
 * @param {any[]} filterModel The model with which we want to filter the rows.
 * @param {React.MutableRefObject<GridPrivateApiCommunity>} apiRef The API of the grid.
 * @returns {GridAggregatedFilterItemApplier | null} A method that checks if a row is matching the current filter model. If `null`, we consider that all the rows are matching the filters.
 */
const buildAggregatedQuickFilterApplier = (filterModel, apiRef) => {
  const quickFilterValues = filterModel.quickFilterValues?.filter(Boolean) ?? [];
  if (quickFilterValues.length === 0) {
    return null;
  }
  const columnFields = shouldQuickFilterExcludeHiddenColumns(filterModel) ? gridVisibleColumnFieldsSelector(apiRef) : gridColumnFieldsSelector(apiRef);
  const appliersPerField = [];
  const {
    ignoreDiacritics
  } = apiRef.current.rootProps;
  const publicApiRef = getPublicApiRef(apiRef);
  columnFields.forEach(field => {
    const column = apiRef.current.getColumn(field);
    const getApplyQuickFilterFn = column?.getApplyQuickFilterFn;
    if (getApplyQuickFilterFn) {
      appliersPerField.push({
        column,
        appliers: quickFilterValues.map(quickFilterValue => {
          const value = ignoreDiacritics ? removeDiacritics(quickFilterValue) : quickFilterValue;
          return {
            fn: getApplyQuickFilterFn(value, column, publicApiRef)
          };
        })
      });
    }
  });
  return function isRowMatchingQuickFilter(row, shouldApplyFilter) {
    const result = {};

    /* eslint-disable no-restricted-syntax, no-labels */
    outer: for (let v = 0; v < quickFilterValues.length; v += 1) {
      const filterValue = quickFilterValues[v];
      for (let i = 0; i < appliersPerField.length; i += 1) {
        const {
          column,
          appliers
        } = appliersPerField[i];
        const {
          field
        } = column;
        if (shouldApplyFilter && !shouldApplyFilter(field)) {
          continue;
        }
        const applier = appliers[v];
        let value = apiRef.current.getRowValue(row, column);
        if (applier.fn === null) {
          continue;
        }
        if (ignoreDiacritics) {
          value = removeDiacritics(value);
        }
        const isMatching = applier.fn(value, row, column, publicApiRef);
        if (isMatching) {
          result[filterValue] = true;
          continue outer;
        }
      }
      result[filterValue] = false;
    }
    /* eslint-enable no-restricted-syntax, no-labels */

    return result;
  };
};
export const buildAggregatedFilterApplier = (filterModel, apiRef, disableEval) => {
  const isRowMatchingFilterItems = buildAggregatedFilterItemsApplier(filterModel, apiRef, disableEval);
  const isRowMatchingQuickFilter = buildAggregatedQuickFilterApplier(filterModel, apiRef);
  return function isRowMatchingFilters(row, shouldApplyFilter, result) {
    result.passingFilterItems = isRowMatchingFilterItems?.(row, shouldApplyFilter) ?? null;
    result.passingQuickFilterValues = isRowMatchingQuickFilter?.(row, shouldApplyFilter) ?? null;
  };
};
const isNotNull = result => result != null;
const filterModelItems = (cache, apiRef, items) => {
  if (!cache.cleanedFilterItems) {
    cache.cleanedFilterItems = items.filter(item => getFilterCallbackFromItem(item, apiRef) !== null);
  }
  return cache.cleanedFilterItems;
};
export const passFilterLogic = (allFilterItemResults, allQuickFilterResults, filterModel, apiRef, cache) => {
  const cleanedFilterItems = filterModelItems(cache, apiRef, filterModel.items);
  const cleanedFilterItemResults = allFilterItemResults.filter(isNotNull);
  const cleanedQuickFilterResults = allQuickFilterResults.filter(isNotNull);

  // get result for filter items model
  if (cleanedFilterItemResults.length > 0) {
    // Return true if the item pass with one of the rows
    const filterItemPredicate = item => {
      return cleanedFilterItemResults.some(filterItemResult => filterItemResult[item.id]);
    };
    const logicOperator = filterModel.logicOperator ?? getDefaultGridFilterModel().logicOperator;
    if (logicOperator === GridLogicOperator.And) {
      const passesAllFilters = cleanedFilterItems.every(filterItemPredicate);
      if (!passesAllFilters) {
        return false;
      }
    } else {
      const passesSomeFilters = cleanedFilterItems.some(filterItemPredicate);
      if (!passesSomeFilters) {
        return false;
      }
    }
  }

  // get result for quick filter model
  if (cleanedQuickFilterResults.length > 0 && filterModel.quickFilterValues != null) {
    // Return true if the item pass with one of the rows
    const quickFilterValuePredicate = value => {
      return cleanedQuickFilterResults.some(quickFilterValueResult => quickFilterValueResult[value]);
    };
    const quickFilterLogicOperator = filterModel.quickFilterLogicOperator ?? getDefaultGridFilterModel().quickFilterLogicOperator;
    if (quickFilterLogicOperator === GridLogicOperator.And) {
      const passesAllQuickFilterValues = filterModel.quickFilterValues.every(quickFilterValuePredicate);
      if (!passesAllQuickFilterValues) {
        return false;
      }
    } else {
      const passesSomeQuickFilterValues = filterModel.quickFilterValues.some(quickFilterValuePredicate);
      if (!passesSomeQuickFilterValues) {
        return false;
      }
    }
  }
  return true;
};