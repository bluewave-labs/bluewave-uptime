"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getFormControlUtilityClasses = getFormControlUtilityClasses;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getFormControlUtilityClasses(slot) {
  return (0, _generateUtilityClass.default)('MuiFormControl', slot);
}
const formControlClasses = (0, _generateUtilityClasses.default)('MuiFormControl', ['root', 'marginNone', 'marginNormal', 'marginDense', 'fullWidth', 'disabled']);
var _default = exports.default = formControlClasses;