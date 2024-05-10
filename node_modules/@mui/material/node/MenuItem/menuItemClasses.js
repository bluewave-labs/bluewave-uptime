"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getMenuItemUtilityClass = getMenuItemUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getMenuItemUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiMenuItem', slot);
}
const menuItemClasses = (0, _generateUtilityClasses.default)('MuiMenuItem', ['root', 'focusVisible', 'dense', 'disabled', 'divider', 'gutters', 'selected']);
var _default = exports.default = menuItemClasses;