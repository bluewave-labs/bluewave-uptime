"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_SINGLE_SELECT_COL_DEF = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _gridStringColDef = require("./gridStringColDef");
var _GridEditSingleSelectCell = require("../components/cell/GridEditSingleSelectCell");
var _gridSingleSelectOperators = require("./gridSingleSelectOperators");
var _filterPanelUtils = require("../components/panel/filterPanel/filterPanelUtils");
var _utils = require("../utils/utils");
const isArrayOfObjects = options => {
  return typeof options[0] === 'object';
};
const defaultGetOptionValue = value => {
  return (0, _utils.isObject)(value) ? value.value : value;
};
const defaultGetOptionLabel = value => {
  return (0, _utils.isObject)(value) ? value.label : String(value);
};
const GRID_SINGLE_SELECT_COL_DEF = exports.GRID_SINGLE_SELECT_COL_DEF = (0, _extends2.default)({}, _gridStringColDef.GRID_STRING_COL_DEF, {
  type: 'singleSelect',
  getOptionLabel: defaultGetOptionLabel,
  getOptionValue: defaultGetOptionValue,
  valueFormatter(value, row, colDef, apiRef) {
    // const { id, field, value, api } = params;
    const rowId = apiRef.current.getRowId(row);
    if (!(0, _filterPanelUtils.isSingleSelectColDef)(colDef)) {
      return '';
    }
    const valueOptions = (0, _filterPanelUtils.getValueOptions)(colDef, {
      id: rowId,
      row
    });
    if (value == null) {
      return '';
    }
    if (!valueOptions) {
      return value;
    }
    if (!isArrayOfObjects(valueOptions)) {
      return colDef.getOptionLabel(value);
    }
    const valueOption = valueOptions.find(option => colDef.getOptionValue(option) === value);
    return valueOption ? colDef.getOptionLabel(valueOption) : '';
  },
  renderEditCell: _GridEditSingleSelectCell.renderEditSingleSelectCell,
  filterOperators: (0, _gridSingleSelectOperators.getGridSingleSelectOperators)(),
  // @ts-ignore
  pastedValueParser: (value, row, column) => {
    const colDef = column;
    const valueOptions = (0, _filterPanelUtils.getValueOptions)(colDef) || [];
    const getOptionValue = colDef.getOptionValue;
    const valueOption = valueOptions.find(option => {
      if (getOptionValue(option) === value) {
        return true;
      }
      return false;
    });
    if (valueOption) {
      return value;
    }
    // do not paste the value if it is not in the valueOptions
    return undefined;
  }
});