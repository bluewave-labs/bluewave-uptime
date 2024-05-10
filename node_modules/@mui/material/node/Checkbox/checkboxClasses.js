"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getCheckboxUtilityClass = getCheckboxUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getCheckboxUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiCheckbox', slot);
}
const checkboxClasses = (0, _generateUtilityClasses.default)('MuiCheckbox', ['root', 'checked', 'disabled', 'indeterminate', 'colorPrimary', 'colorSecondary', 'sizeSmall', 'sizeMedium']);
var _default = exports.default = checkboxClasses;