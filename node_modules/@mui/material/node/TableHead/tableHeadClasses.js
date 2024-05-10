"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTableHeadUtilityClass = getTableHeadUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTableHeadUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTableHead', slot);
}
const tableHeadClasses = (0, _generateUtilityClasses.default)('MuiTableHead', ['root']);
var _default = exports.default = tableHeadClasses;