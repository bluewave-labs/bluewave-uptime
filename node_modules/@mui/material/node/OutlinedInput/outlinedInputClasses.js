"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getOutlinedInputUtilityClass = getOutlinedInputUtilityClass;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _InputBase = require("../InputBase");
function getOutlinedInputUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiOutlinedInput', slot);
}
const outlinedInputClasses = (0, _extends2.default)({}, _InputBase.inputBaseClasses, (0, _generateUtilityClasses.default)('MuiOutlinedInput', ['root', 'notchedOutline', 'input']));
var _default = exports.default = outlinedInputClasses;