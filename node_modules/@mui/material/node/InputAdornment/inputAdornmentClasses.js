"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getInputAdornmentUtilityClass = getInputAdornmentUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getInputAdornmentUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiInputAdornment', slot);
}
const inputAdornmentClasses = (0, _generateUtilityClasses.default)('MuiInputAdornment', ['root', 'filled', 'standard', 'outlined', 'positionStart', 'positionEnd', 'disablePointerEvents', 'hiddenLabel', 'sizeSmall']);
var _default = exports.default = inputAdornmentClasses;