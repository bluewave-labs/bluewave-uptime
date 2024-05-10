"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getPopoverUtilityClass = getPopoverUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getPopoverUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiPopover', slot);
}
const popoverClasses = (0, _generateUtilityClasses.default)('MuiPopover', ['root', 'paper']);
var _default = exports.default = popoverClasses;