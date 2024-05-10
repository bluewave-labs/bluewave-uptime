"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTableBodyUtilityClass = getTableBodyUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTableBodyUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTableBody', slot);
}
const tableBodyClasses = (0, _generateUtilityClasses.default)('MuiTableBody', ['root']);
var _default = exports.default = tableBodyClasses;