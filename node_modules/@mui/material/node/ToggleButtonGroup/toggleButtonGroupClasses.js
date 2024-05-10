"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getToggleButtonGroupUtilityClass = getToggleButtonGroupUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getToggleButtonGroupUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiToggleButtonGroup', slot);
}
const toggleButtonGroupClasses = (0, _generateUtilityClasses.default)('MuiToggleButtonGroup', ['root', 'selected', 'vertical', 'disabled', 'grouped', 'groupedHorizontal', 'groupedVertical', 'fullWidth', 'firstButton', 'lastButton', 'middleButton']);
var _default = exports.default = toggleButtonGroupClasses;