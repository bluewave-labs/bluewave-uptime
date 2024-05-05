"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTableSortLabelUtilityClass = getTableSortLabelUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTableSortLabelUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTableSortLabel', slot);
}
const tableSortLabelClasses = (0, _generateUtilityClasses.default)('MuiTableSortLabel', ['root', 'active', 'icon', 'iconDirectionDesc', 'iconDirectionAsc']);
var _default = exports.default = tableSortLabelClasses;