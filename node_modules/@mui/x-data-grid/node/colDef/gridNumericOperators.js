"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridNumericQuickFilterFn = exports.getGridNumericOperators = void 0;
var _GridFilterInputValue = require("../components/panel/filterPanel/GridFilterInputValue");
var _GridFilterInputMultipleValue = require("../components/panel/filterPanel/GridFilterInputMultipleValue");
const parseNumericValue = value => {
  if (value == null) {
    return null;
  }
  return Number(value);
};
const getGridNumericQuickFilterFn = value => {
  if (value == null || Number.isNaN(value) || value === '') {
    return null;
  }
  return columnValue => {
    return parseNumericValue(columnValue) === parseNumericValue(value);
  };
};
exports.getGridNumericQuickFilterFn = getGridNumericQuickFilterFn;
const getGridNumericOperators = () => [{
  value: '=',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }
    return value => {
      return parseNumericValue(value) === filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  value: '!=',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }
    return value => {
      return parseNumericValue(value) !== filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  value: '>',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }
    return value => {
      if (value == null) {
        return false;
      }
      return parseNumericValue(value) > filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  value: '>=',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }
    return value => {
      if (value == null) {
        return false;
      }
      return parseNumericValue(value) >= filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  value: '<',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }
    return value => {
      if (value == null) {
        return false;
      }
      return parseNumericValue(value) < filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  value: '<=',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }
    return value => {
      if (value == null) {
        return false;
      }
      return parseNumericValue(value) <= filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  value: 'isEmpty',
  getApplyFilterFn: () => {
    return value => {
      return value == null;
    };
  },
  requiresFilterValue: false
}, {
  value: 'isNotEmpty',
  getApplyFilterFn: () => {
    return value => {
      return value != null;
    };
  },
  requiresFilterValue: false
}, {
  value: 'isAnyOf',
  getApplyFilterFn: filterItem => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
      return null;
    }
    return value => {
      return value != null && filterItem.value.includes(Number(value));
    };
  },
  InputComponent: _GridFilterInputMultipleValue.GridFilterInputMultipleValue,
  InputComponentProps: {
    type: 'number'
  }
}];
exports.getGridNumericOperators = getGridNumericOperators;