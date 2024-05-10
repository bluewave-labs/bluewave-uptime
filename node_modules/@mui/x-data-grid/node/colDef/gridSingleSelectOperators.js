"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridSingleSelectOperators = void 0;
var _GridFilterInputSingleSelect = require("../components/panel/filterPanel/GridFilterInputSingleSelect");
var _GridFilterInputMultipleSingleSelect = require("../components/panel/filterPanel/GridFilterInputMultipleSingleSelect");
var _utils = require("../utils/utils");
const parseObjectValue = value => {
  if (value == null || !(0, _utils.isObject)(value)) {
    return value;
  }
  return value.value;
};
const getGridSingleSelectOperators = () => [{
  value: 'is',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || filterItem.value === '') {
      return null;
    }
    return value => parseObjectValue(value) === parseObjectValue(filterItem.value);
  },
  InputComponent: _GridFilterInputSingleSelect.GridFilterInputSingleSelect
}, {
  value: 'not',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || filterItem.value === '') {
      return null;
    }
    return value => parseObjectValue(value) !== parseObjectValue(filterItem.value);
  },
  InputComponent: _GridFilterInputSingleSelect.GridFilterInputSingleSelect
}, {
  value: 'isAnyOf',
  getApplyFilterFn: filterItem => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
      return null;
    }
    const filterItemValues = filterItem.value.map(parseObjectValue);
    return value => filterItemValues.includes(parseObjectValue(value));
  },
  InputComponent: _GridFilterInputMultipleSingleSelect.GridFilterInputMultipleSingleSelect
}];
exports.getGridSingleSelectOperators = getGridSingleSelectOperators;