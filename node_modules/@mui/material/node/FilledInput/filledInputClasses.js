"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getFilledInputUtilityClass = getFilledInputUtilityClass;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _InputBase = require("../InputBase");
function getFilledInputUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiFilledInput', slot);
}
const filledInputClasses = (0, _extends2.default)({}, _InputBase.inputBaseClasses, (0, _generateUtilityClasses.default)('MuiFilledInput', ['root', 'underline', 'input']));
var _default = exports.default = filledInputClasses;