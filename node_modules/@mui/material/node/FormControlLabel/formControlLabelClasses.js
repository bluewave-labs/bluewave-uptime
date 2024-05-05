"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getFormControlLabelUtilityClasses = getFormControlLabelUtilityClasses;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getFormControlLabelUtilityClasses(slot) {
  return (0, _generateUtilityClass.default)('MuiFormControlLabel', slot);
}
const formControlLabelClasses = (0, _generateUtilityClasses.default)('MuiFormControlLabel', ['root', 'labelPlacementStart', 'labelPlacementTop', 'labelPlacementBottom', 'disabled', 'label', 'error', 'required', 'asterisk']);
var _default = exports.default = formControlLabelClasses;