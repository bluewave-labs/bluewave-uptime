"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getToggleButtonUtilityClass = getToggleButtonUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getToggleButtonUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiToggleButton', slot);
}
const toggleButtonClasses = (0, _generateUtilityClasses.default)('MuiToggleButton', ['root', 'disabled', 'selected', 'standard', 'primary', 'secondary', 'sizeSmall', 'sizeMedium', 'sizeLarge', 'fullWidth']);
var _default = exports.default = toggleButtonClasses;