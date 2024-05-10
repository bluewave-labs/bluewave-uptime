"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTableFooterUtilityClass = getTableFooterUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTableFooterUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTableFooter', slot);
}
const tableFooterClasses = (0, _generateUtilityClasses.default)('MuiTableFooter', ['root']);
var _default = exports.default = tableFooterClasses;