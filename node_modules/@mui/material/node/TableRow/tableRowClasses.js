"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTableRowUtilityClass = getTableRowUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTableRowUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTableRow', slot);
}
const tableRowClasses = (0, _generateUtilityClasses.default)('MuiTableRow', ['root', 'selected', 'hover', 'head', 'footer']);
var _default = exports.default = tableRowClasses;