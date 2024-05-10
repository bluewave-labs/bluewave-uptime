"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTableContainerUtilityClass = getTableContainerUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTableContainerUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTableContainer', slot);
}
const tableContainerClasses = (0, _generateUtilityClasses.default)('MuiTableContainer', ['root']);
var _default = exports.default = tableContainerClasses;