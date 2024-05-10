"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueFromValueOptions = getValueFromValueOptions;
exports.getValueOptions = getValueOptions;
exports.isSingleSelectColDef = isSingleSelectColDef;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
function isSingleSelectColDef(colDef) {
  return colDef?.type === 'singleSelect';
}
function getValueOptions(column, additionalParams) {
  if (!column) {
    return undefined;
  }
  return typeof column.valueOptions === 'function' ? column.valueOptions((0, _extends2.default)({
    field: column.field
  }, additionalParams)) : column.valueOptions;
}
function getValueFromValueOptions(value, valueOptions, getOptionValue) {
  if (valueOptions === undefined) {
    return undefined;
  }
  const result = valueOptions.find(option => {
    const optionValue = getOptionValue(option);
    return String(optionValue) === String(value);
  });
  return getOptionValue(result);
}