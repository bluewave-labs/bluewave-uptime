"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getScopedCssBaselineUtilityClass = getScopedCssBaselineUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getScopedCssBaselineUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiScopedCssBaseline', slot);
}
const scopedCssBaselineClasses = (0, _generateUtilityClasses.default)('MuiScopedCssBaseline', ['root']);
var _default = exports.default = scopedCssBaselineClasses;