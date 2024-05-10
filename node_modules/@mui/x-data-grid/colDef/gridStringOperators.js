import { GridFilterInputValue } from '../components/panel/filterPanel/GridFilterInputValue';
import { escapeRegExp } from '../utils/utils';
import { GridFilterInputMultipleValue } from '../components/panel/filterPanel/GridFilterInputMultipleValue';
import { removeDiacritics } from '../hooks/features/filter/gridFilterUtils';
export const getGridStringQuickFilterFn = value => {
  if (!value) {
    return null;
  }
  const filterRegex = new RegExp(escapeRegExp(value), 'i');
  return (_, row, column, apiRef) => {
    let columnValue = apiRef.current.getRowFormattedValue(row, column);
    if (apiRef.current.ignoreDiacritics) {
      columnValue = removeDiacritics(columnValue);
    }
    return columnValue != null ? filterRegex.test(columnValue.toString()) : false;
  };
};
export const getGridStringOperators = (disableTrim = false) => [{
  value: 'contains',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
    const filterRegex = new RegExp(escapeRegExp(filterItemValue), 'i');
    return value => {
      return value != null ? filterRegex.test(String(value)) : false;
    };
  },
  InputComponent: GridFilterInputValue
}, {
  value: 'equals',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
    const collator = new Intl.Collator(undefined, {
      sensitivity: 'base',
      usage: 'search'
    });
    return value => {
      return value != null ? collator.compare(filterItemValue, value.toString()) === 0 : false;
    };
  },
  InputComponent: GridFilterInputValue
}, {
  value: 'startsWith',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
    const filterRegex = new RegExp(`^${escapeRegExp(filterItemValue)}.*$`, 'i');
    return value => {
      return value != null ? filterRegex.test(value.toString()) : false;
    };
  },
  InputComponent: GridFilterInputValue
}, {
  value: 'endsWith',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
    const filterRegex = new RegExp(`.*${escapeRegExp(filterItemValue)}$`, 'i');
    return value => {
      return value != null ? filterRegex.test(value.toString()) : false;
    };
  },
  InputComponent: GridFilterInputValue
}, {
  value: 'isEmpty',
  getApplyFilterFn: () => {
    return value => {
      return value === '' || value == null;
    };
  },
  requiresFilterValue: false
}, {
  value: 'isNotEmpty',
  getApplyFilterFn: () => {
    return value => {
      return value !== '' && value != null;
    };
  },
  requiresFilterValue: false
}, {
  value: 'isAnyOf',
  getApplyFilterFn: filterItem => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.map(val => val.trim());
    const collator = new Intl.Collator(undefined, {
      sensitivity: 'base',
      usage: 'search'
    });
    return value => value != null ? filterItemValue.some(filterValue => {
      return collator.compare(filterValue, value.toString() || '') === 0;
    }) : false;
  },
  InputComponent: GridFilterInputMultipleValue
}];